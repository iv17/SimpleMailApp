package com.example.server;

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
import com.google.api.services.gmail.model.Message;
import com.google.api.services.gmail.model.MessagePartHeader;

@Service
public class GmailService {

	protected JSONObject fetchMessage(Message message) throws IOException, JSONException, ParseException {

		JSONObject messageJSON = new JSONObject();

		messageJSON.put("id", message.getId());
		messageJSON.put("snippet", message.getSnippet());
		JSONArray labels = new JSONArray();
		for (String label : message.getLabelIds()) {
			labels.put(label);
		}
		messageJSON.put("labels", labels);
		
		JSONArray headersArray = fetchMessageHeaders(message);
		messageJSON.put("headers", headersArray);
		
		return messageJSON;

	}
	
	protected JSONObject fetchFullMessage(Message message) throws JSONException, ParseException {

		JSONObject messageJSON = new JSONObject();

		messageJSON.put("id", message.getId());
		String content = "";
		if(message.getPayload().getBody().getData()!= null) {
			//ZA POSLATE
			content = StringUtils.newStringUtf8(Base64.decodeBase64(message.getPayload().getBody().getData()));
		} else {
			//ZA PRIMLJENJE
			content = StringUtils.newStringUtf8(Base64.decodeBase64(message.getPayload().getParts().get(0).getBody().getData()));
		}
		
		messageJSON.put("content", content);
		JSONArray labels = new JSONArray();
		for (String label : message.getLabelIds()) {
			labels.put(label);
		}
		messageJSON.put("labelIds", labels);
		
		JSONArray headersArray = fetchMessageHeaders(message);
		messageJSON.put("headers", headersArray);
		
		return messageJSON;

	}
	
	protected JSONArray fetchMessageHeaders(Message message) throws ParseException {
		
		JSONArray headersArray = new JSONArray();
		for (MessagePartHeader header : message.getPayload().getHeaders()) {
			if(header.getName().equals("Date")) {
				SimpleDateFormat f = new SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss Z", Locale.ROOT);
				f.setTimeZone(TimeZone.getTimeZone("UTC"));
				Date date =  f.parse(header.getValue());  
				DateFormat df = new SimpleDateFormat("dd.MM.yyyy kk:mm", Locale.ENGLISH);
				String s = df.format(date);
				header.setValue(s);
				headersArray.put(header);
			}
			if(header.getName().equals("Subject")) {
				headersArray.put(header);
			}
			if(header.getName().equals("From")) {
				headersArray.put(header);
			}
			if(header.getName().equals("To")) {
				headersArray.put(header);
			}

		}
		return headersArray;
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
	protected MimeMessage createEmail(String to, String from, String subject, String bodyText) throws MessagingException {

		Properties props = new Properties();
		Session session = Session.getDefaultInstance(props, null);

		MimeMessage email = new MimeMessage(session);

		email.setFrom(new InternetAddress(from));
		email.addRecipient(javax.mail.Message.RecipientType.TO, new InternetAddress(to));
		email.setSubject(subject);
		email.setText(bodyText);

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
	protected Message createMessageWithEmail(MimeMessage emailContent)
			throws MessagingException, IOException {

		ByteArrayOutputStream buffer = new ByteArrayOutputStream();
		emailContent.writeTo(buffer);
		byte[] bytes = buffer.toByteArray();
		String encodedEmail = Base64.encodeBase64URLSafeString(bytes);
		Message message = new Message();
		message.setRaw(encodedEmail);

		return message;
	}
	
	protected Message prepareForSend(String body, String userId) throws JSONException, MessagingException, IOException {
		JSONObject json = new JSONObject(body);
		String to = json.getString("to");
		String subject = json.getString("subject");
		String bodyText = json.getString("bodyText");

		MimeMessage emailContent = createEmail(to, userId, subject, bodyText);

		Message message = createMessageWithEmail(emailContent);
		
		return message;
	}
	
	protected List<String> getScopes() {
		List<String> scopes = new ArrayList<>();
		
		scopes.add(GmailScopes.GMAIL_COMPOSE);
		scopes.add(GmailScopes.GMAIL_INSERT);
		scopes.add(GmailScopes.GMAIL_LABELS);
		//scopes.add(GmailScopes.GMAIL_METADATA);
		scopes.add(GmailScopes.GMAIL_MODIFY);
		scopes.add(GmailScopes.GMAIL_READONLY);
		scopes.add(GmailScopes.GMAIL_SEND);
		scopes.add(GmailScopes.GMAIL_SETTINGS_BASIC);
		//scopes.addAll(GmailScopes.all());
		
		return scopes;
	}

}
