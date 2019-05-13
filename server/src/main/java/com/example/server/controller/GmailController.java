package com.example.server.controller;

import java.io.IOException;
import java.net.URISyntaxException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.mail.MessagingException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import com.example.server.service.FetchService;
import com.example.server.service.GmailService;
import com.example.server.service.UtilService;
import com.google.api.client.auth.oauth2.AuthorizationCodeRequestUrl;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.auth.oauth2.TokenResponse;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets.Details;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.Gmail.Builder;
import com.google.api.services.gmail.model.Draft;
import com.google.api.services.gmail.model.Label;
import com.google.api.services.gmail.model.ListLabelsResponse;
import com.google.api.services.gmail.model.ListMessagesResponse;
import com.google.api.services.gmail.model.Message;
import com.google.api.services.gmail.model.Profile;

@CrossOrigin(origins = "http://localhost:5500")
@RestController
@RequestMapping(value = "")
public class GmailController {

	private static final String APPLICATION_NAME = "Simple mail app";
	private static final String USER_ID = "me";
	private static HttpTransport httpTransport;
	private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
	private static Gmail client;
	private static GoogleClientSecrets clientSecrets;
	private static GoogleAuthorizationCodeFlow flow;
	private static Credential credential;

	@Value("${gmail.client.clientId}")
	private String clientId;

	@Value("${gmail.client.clientSecret}")
	private String clientSecret;

	@Value("${gmail.client.redirectUri}")
	private String redirectUri;

	@Autowired
	UtilService utilService;
	
	@Autowired
	FetchService fetchService;
	
	@Autowired
	GmailService service;


	@RequestMapping(value = "/login", 
			method = RequestMethod.GET)
	public RedirectView login() throws Exception {
		AuthorizationCodeRequestUrl authorizationUrl;
		if (flow == null) {
			Details web = new Details();
			web.setClientId(clientId);
			web.setClientSecret(clientSecret);
			clientSecrets = new GoogleClientSecrets().setWeb(web);
			httpTransport = GoogleNetHttpTransport.newTrustedTransport();

			List<String> scopes = utilService.getScopes();
			flow = new GoogleAuthorizationCodeFlow
					.Builder(httpTransport, JSON_FACTORY, clientSecrets, Collections.unmodifiableList(scopes))
					.build();
		}
		authorizationUrl = flow.newAuthorizationUrl().setRedirectUri(redirectUri);
		String build = authorizationUrl.build();

		return new RedirectView(build);
	}


	@RequestMapping(value = "/login/gmailCallback", 
			method = RequestMethod.GET, 	
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RedirectView callback(@RequestParam(value = "code") String code) throws URISyntaxException, IOException {

		TokenResponse response = flow.newTokenRequest(code).setRedirectUri(redirectUri).execute();
		credential = flow.createAndStoreCredential(response, "userID");	

		client = new Builder(httpTransport, JSON_FACTORY, credential)
				.setApplicationName(APPLICATION_NAME).build();
		
		RedirectView redirect = new RedirectView("http://localhost:5500/SimpleMailApp/client/index.html");

		return redirect;

	}


	@RequestMapping(value = "/me", 
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> getMe() throws IOException, JSONException {

		Profile profile = client.users().getProfile(USER_ID).execute();

		JSONObject me = new JSONObject();
		me.put("email", profile.getEmailAddress());

		return new ResponseEntity<>(me.toString(), HttpStatus.OK);

	}


	@RequestMapping(value = "/labels", 
			method = RequestMethod.GET, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> getLabels() throws IOException, JSONException {

		ListLabelsResponse labelsResponse = client.users().labels().list(USER_ID).execute();

		JSONArray labelArray = fetchLabels(labelsResponse);
		
		return new ResponseEntity<>(labelArray.toString(), HttpStatus.OK);

	}


	@RequestMapping(value = "/allMessages", 
			method = RequestMethod.GET, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> getAllMessages() throws IOException, JSONException, ParseException {

		ListMessagesResponse msgResponse = client.users().messages().list(USER_ID).execute();

		JSONArray messageArray = fetchMessages(msgResponse);

		return new ResponseEntity<>(messageArray.toString(), HttpStatus.OK);

	}


	@RequestMapping(value = "/messages", 
			method = RequestMethod.GET, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> getMessages(@RequestParam(value = "label") String l) throws IOException, JSONException, ParseException {

		List<String> labelIds = new ArrayList<>();
		labelIds.add(l);

		ListMessagesResponse msgResponse = client.users().messages().list(USER_ID).setLabelIds(labelIds).execute();

		JSONArray messageArray = fetchMessages(msgResponse);	

		return new ResponseEntity<>(messageArray.toString(), HttpStatus.OK);

	}
	

	@RequestMapping(value = "/message", 
			method = RequestMethod.GET, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> getMessage(@RequestParam(value = "id") String id) throws JSONException, ParseException, IOException {

		Message message = client.users().messages().get(USER_ID, id).setFormat("full").execute();
		JSONObject messageJSON = fetchService.fetchFullMessage(message);

		return new ResponseEntity<>(messageJSON.toString(), HttpStatus.OK);

	}


	@RequestMapping(value = "/send", 
			method = RequestMethod.POST, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> sendMessage(@RequestBody String body) throws JSONException, IOException, MessagingException, ParseException {		

		Message temp = service.prepareForSend(body, USER_ID);

		Message send = client.users().messages().send(USER_ID, temp).execute();

		Message message = client.users().messages().get(USER_ID, send.getId()).setFormat("full").execute();
		JSONObject messageJSON = fetchService.fetchFullMessage(message);

		return new ResponseEntity<>(messageJSON.toString(), HttpStatus.OK);

	}


	@RequestMapping(value = "/draft", 
			method = RequestMethod.POST, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> draftMessage(@RequestBody String body) throws JSONException, IOException, MessagingException, ParseException {		

		Message temp = service.prepareForSend(body, USER_ID);

		Draft tempDraft = new Draft();
		tempDraft.setMessage(temp);
		client.users().drafts().create(USER_ID, tempDraft).execute();

		List<String> labelIds = new ArrayList<>();
		labelIds.add("DRAFT");

		ListMessagesResponse msgResponse = client.users().messages().list(USER_ID).setLabelIds(labelIds).execute();

		JSONArray messageArray = fetchMessages(msgResponse);	

		return new ResponseEntity<>(messageArray.toString(), HttpStatus.OK);

	}


	@RequestMapping(value = "/trash", 
			method = RequestMethod.POST, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> trashMessage(@RequestParam(value = "id") String id) throws JSONException, IOException, MessagingException, ParseException {		

		client.users().messages().trash(USER_ID, id).execute();

		List<String> labelIds = new ArrayList<>();
		labelIds.add("TRASH");
		ListMessagesResponse msgResponse = client.users().messages().list(USER_ID).setLabelIds(labelIds).execute();

		JSONArray messageArray = fetchMessages(msgResponse);	

		return new ResponseEntity<>(messageArray.toString(), HttpStatus.OK);

	}


	@RequestMapping(value = "/untrash", 
			method = RequestMethod.POST, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> untrashMessage(@RequestParam(value = "id") String id) throws JSONException, IOException, MessagingException, ParseException {		

		client.users().messages().untrash(USER_ID, id).execute();

		List<String> labelIds = new ArrayList<>();
		labelIds.add("INBOX");
		ListMessagesResponse msgResponse = client.users().messages().list(USER_ID).setLabelIds(labelIds).execute();

		JSONArray messageArray = fetchMessages(msgResponse);	

		return new ResponseEntity<>(messageArray.toString(), HttpStatus.OK);

	}


	@RequestMapping(value = "/delete", 
			method = RequestMethod.POST, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> deleteMessage(@RequestParam(value = "id") String id) throws JSONException, IOException, MessagingException, ParseException {		

		client.users().messages().delete(USER_ID, id).execute();

		List<String> labelIds = new ArrayList<>();
		labelIds.add("TRASH");
		ListMessagesResponse msgResponse = client.users().messages().list(USER_ID).setLabelIds(labelIds).execute();

		JSONArray messageArray = fetchMessages(msgResponse);

		return new ResponseEntity<>(messageArray.toString(), HttpStatus.OK);

	}


	@RequestMapping(value = "/logout", 
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> logout() throws IOException, JSONException {


		JSONObject me = new JSONObject();

		return new ResponseEntity<>(me.toString(), HttpStatus.OK);

	}
	
	private JSONArray fetchMessages(ListMessagesResponse msgResponse) throws IOException, JSONException, ParseException {

		JSONArray messageArray = new JSONArray();
		if(msgResponse.getMessages() == null) {
			return messageArray;
		}

		for (Message msg : msgResponse.getMessages()) {

			Message message = client.users().messages().get(USER_ID, msg.getId()).execute();

			JSONObject messageJSON = fetchService.fetchMessage(message);
			messageArray.put(messageJSON);
		}	
		
		return messageArray;
	}
	
	private JSONArray fetchLabels(ListLabelsResponse labelsResponse) throws IOException, JSONException {
		
		JSONArray labelArray = new JSONArray();
		for (Label l : labelsResponse.getLabels()) {
			Label label = client.users().labels().get(USER_ID, l.getId()).execute();

			JSONObject labelJSON = fetchService.fetchLabel(label);
			if(labelJSON.getString("labelListVisibility").equals("labelShow")) {
				labelArray.put(labelJSON);
			}
		}
		
		return labelArray;
	}
	
}
