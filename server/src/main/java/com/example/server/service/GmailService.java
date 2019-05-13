package com.example.server.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Properties;

import javax.mail.Message.RecipientType;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.apache.tomcat.util.codec.binary.Base64;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.google.api.services.gmail.model.Message;

@Service
public class GmailService {

	
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
			email.addRecipient(RecipientType.TO, new InternetAddress(to));
		} else {
			email.addRecipients(RecipientType.TO, "");
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
	
}
