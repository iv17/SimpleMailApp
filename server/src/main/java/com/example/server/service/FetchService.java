package com.example.server.service;

import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

import org.apache.tomcat.util.codec.binary.Base64;
import org.apache.tomcat.util.codec.binary.StringUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.google.api.services.gmail.model.Draft;
import com.google.api.services.gmail.model.Label;
import com.google.api.services.gmail.model.Message;
import com.google.api.services.gmail.model.MessagePartHeader;

@Service
public class FetchService {

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
	
	public JSONObject fetchDraft(Draft draft) throws IOException, JSONException, ParseException {

		JSONObject draftJSON = new JSONObject();

		draftJSON.put("id", draft.getId());
		Message message = draft.getMessage();
		JSONObject messageJSON = fetchMessage(message);
		draftJSON.put("message", messageJSON);
		
		return draftJSON;

	}
	
	public JSONObject fetchDraftForSend(Message message) throws ParseException, JSONException {
		
		JSONObject json = new JSONObject();
		for (MessagePartHeader header : message.getPayload().getHeaders()) {
			if(header.getName().equals("Subject")) {
				json.put("subject", header.getValue());
			}
			if(header.getName().equals("To")) {
				json.put("to", header.getValue());
			}
		}
		String content = "";
		if(message.getPayload().getBody().getData()!= null) {
			content = StringUtils.newStringUtf8(Base64.decodeBase64(message.getPayload().getBody().getData()));
		}
		
		json.put("bodyText", content);
		
		return json;
	}
	
}
