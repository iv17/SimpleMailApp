package com.example.server.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Properties;
import java.util.TimeZone;

import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.apache.tomcat.util.codec.binary.Base64;
import org.apache.tomcat.util.codec.binary.StringUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.google.api.services.gmail.GmailScopes;
import com.google.api.services.gmail.model.Draft;
import com.google.api.services.gmail.model.Label;
import com.google.api.services.gmail.model.Message;
import com.google.api.services.gmail.model.MessagePartHeader;

@Service
public class GmailService {

	public JSONObject fetchLabel(Label label) throws JSONException {
		
		JSONObject labelJSON = new JSONObject();
		
		labelJSON.put("name", label.getName());
		labelJSON.put("messagesTotal", label.getMessagesTotal());
		
		if(label.getLabelListVisibility() != null) {
			labelJSON.put("labelListVisibility", label.getLabelListVisibility());
		} else {
			labelJSON.put("labelListVisibility", "labelShow");
		}
		
		return labelJSON;
	}
	
	public JSONObject fetchMessage(Message message) throws IOException, JSONException, ParseException {

		JSONObject messageJSON = new JSONObject();

		messageJSON.put("id", message.getId());
		messageJSON.put("snippet", message.getSnippet());
		JSONArray labels = new JSONArray();
		for (String label : message.getLabelIds()) {
			labels.put(label);
		}
		messageJSON.put("labels", labels);
		
		JSONObject headersArray = fetchMessageHeaders(message);
		messageJSON.put("headers", headersArray);
		
		return messageJSON;

	}
	
	public JSONObject fetchFullMessage(Message message) throws JSONException, ParseException {

		JSONObject messageJSON = new JSONObject();

		messageJSON.put("id", message.getId());
		String content = "";
		if(message.getPayload().getBody().getData()!= null) {
			//ZA POSLATE
			content = StringUtils.newStringUtf8(Base64.decodeBase64(message.getPayload().getBody().getData()));
		} else {
			//ZA PRIMLJENE
			content = StringUtils.newStringUtf8(Base64.decodeBase64(message.getPayload().getParts().get(0).getBody().getData()));
		}
		
		messageJSON.put("content", content);
		JSONArray labels = new JSONArray();
		for (String label : message.getLabelIds()) {
			labels.put(label);
		}
		messageJSON.put("labelIds", labels);
		
		JSONObject headersArray = fetchMessageHeaders(message);
		messageJSON.put("headers", headersArray);
		
		return messageJSON;

	}
	
	public JSONObject fetchMessageHeaders(Message message) throws ParseException, JSONException {
		
		JSONObject headersObject = new JSONObject();
		for (MessagePartHeader header : message.getPayload().getHeaders()) {
			if(header.getName().equals("Date")) {
				SimpleDateFormat f = new SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss Z", Locale.ROOT);
				f.setTimeZone(TimeZone.getTimeZone("UTC"));
				Date date =  f.parse(header.getValue());  
				DateFormat df = new SimpleDateFormat("dd.MM.yyyy kk:mm", Locale.ENGLISH);
				String s = df.format(date);
				header.setValue(s);
				headersObject.put("date", header.getValue());
			}
			if(header.getName().equals("Subject")) {
				headersObject.put("subject", header.getValue());
			}
			if(header.getName().equals("From")) {
				headersObject.put("from", header.getValue());
			}
			if(header.getName().equals("To")) {
				headersObject.put("to", header.getValue());
			}

		}
		return headersObject;
	}

	/**
	 * Create a MimeMessage using the parameters provided.
	 *
	 * @param to email address of the receiver
	 * @param from email address of the sender, the mailbox account
	 * @param subject subject of the email
	 * @param bodyText body text of the email
	 * @return the MimeMessage to be used to send email
	 * @throws MessagingException
	 */
	public MimeMessage createEmail(String to, String from, String subject, String bodyText) throws MessagingException {

		Properties props = new Properties();
		Session session = Session.getDefaultInstance(props, null);

		MimeMessage email = new MimeMessage(session);

		if(from != null) {
			email.setFrom(new InternetAddress(from));
		} else {
			email.setFrom("");
		}
		if(to != null && !to.equals("")) {
			email.addRecipient(javax.mail.Message.RecipientType.TO, new InternetAddress(to));
		} else {
			email.addRecipients(javax.mail.Message.RecipientType.TO, "");
		}
		if(subject != null) {
			email.setSubject(subject);
		} else {
			email.setSubject("");
		}
		if(bodyText != null) {
			email.setText(bodyText);
		} else {
			email.setText("");
		}

		return email;
	}

	/**
	 * Create a message from an email.
	 *
	 * @param emailContent Email to be set to raw of message
	 * @return a message containing a base64url encoded email
	 * @throws IOException
	 * @throws MessagingException
	 */
	public Message createMessageWithEmail(MimeMessage emailContent)
			throws MessagingException, IOException {

		ByteArrayOutputStream buffer = new ByteArrayOutputStream();
		emailContent.writeTo(buffer);
		byte[] bytes = buffer.toByteArray();
		String encodedEmail = Base64.encodeBase64URLSafeString(bytes);
		Message message = new Message();
		message.setRaw(encodedEmail);

		return message;
	}
	
	public Message prepareForSend(String body, String userId) throws JSONException, MessagingException, IOException {
		JSONObject json = new JSONObject(body);
		String to = json.getString("to");
		String subject = json.getString("subject");
		String bodyText = json.getString("bodyText");

		MimeMessage emailContent = createEmail(to, userId, subject, bodyText);

		Message message = createMessageWithEmail(emailContent);
		
		return message;
	}
	
	public JSONObject fetchDraft(Draft draft) throws IOException, JSONException, ParseException {

		JSONObject draftJSON = new JSONObject();

		draftJSON.put("id", draft.getId());
		Message message = draft.getMessage();
		JSONObject messageJSON = fetchMessage(message);
		draftJSON.put("message", messageJSON);
		
		return draftJSON;

	}
	
	public List<String> getScopes() {
		List<String> scopes = new ArrayList<>();
		
		scopes.add("https://mail.google.com/");
		scopes.add(GmailScopes.GMAIL_COMPOSE);
		scopes.add(GmailScopes.GMAIL_INSERT);
		scopes.add(GmailScopes.GMAIL_LABELS);
		scopes.add(GmailScopes.GMAIL_MODIFY);
		scopes.add(GmailScopes.GMAIL_READONLY);
		scopes.add(GmailScopes.GMAIL_SEND);
		
		return scopes;
	}

}
