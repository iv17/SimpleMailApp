package com.example.server;

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
import com.google.api.services.gmail.model.Label;
import com.google.api.services.gmail.model.ListLabelsResponse;
import com.google.api.services.gmail.model.ListMessagesResponse;
import com.google.api.services.gmail.model.Message;
import com.google.api.services.gmail.model.Profile;

@CrossOrigin(origins = "http://localhost:5500")
@RestController
@RequestMapping(value = "")
public class Controller {

	private static final String APPLICATION_NAME = "Simple mail app";
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
	GmailService service;


	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public RedirectView googleConnectionStatus() throws Exception {
		AuthorizationCodeRequestUrl authorizationUrl;
		if (flow == null) {
			Details web = new Details();
			web.setClientId(clientId);
			web.setClientSecret(clientSecret);
			clientSecrets = new GoogleClientSecrets().setWeb(web);
			httpTransport = GoogleNetHttpTransport.newTrustedTransport();

			List<String> scopes = service.getScopes();
			flow = new GoogleAuthorizationCodeFlow
					.Builder(httpTransport, JSON_FACTORY, clientSecrets, Collections.unmodifiableList(scopes))
					//.setAccessType("offline")
					//.setApprovalPrompt("force")
					.build();
		}
		authorizationUrl = flow.newAuthorizationUrl().setRedirectUri(redirectUri);
		String build = authorizationUrl.build();

		return new RedirectView(build);
	}


	@RequestMapping(value = "/login/gmailCallback", method = RequestMethod.GET, params = "code",	
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RedirectView callback(@RequestParam(value = "code") String code) throws URISyntaxException, IOException {

		TokenResponse response = flow.newTokenRequest(code).setRedirectUri(redirectUri).execute();
		credential = flow.createAndStoreCredential(response, "userID");	

		RedirectView redirect = new RedirectView("http://localhost:5500/SimpleMailApp/client/index.html");
		redirect.addStaticAttribute("code", code);

		return redirect;

	}

	@RequestMapping(value = "/me", method = RequestMethod.GET, params = "code",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> getMe(@RequestParam(value = "code") String code) throws IOException, JSONException {

		

			client = new com.google.api.services.gmail.Gmail.Builder(httpTransport, JSON_FACTORY, credential)
					.setApplicationName(APPLICATION_NAME).build();

			String userId = "me";
			Profile profile = client.users().getProfile(userId).execute();
			JSONObject me = new JSONObject();
			me.put("email", profile.getEmailAddress());

			/*GoogleCredential credential = new GoogleCredential().setAccessToken(response.getAccessToken());   
			Oauth2 oauth2 = new Oauth2.Builder(httpTransport, JSON_FACTORY, credential)
					.setApplicationName(APPLICATION_NAME).build();
			Userinfoplus userinfo = oauth2.userinfo().get().execute();
			System.out.println(userinfo.getName());
			System.out.println(userinfo.getFamilyName());
			System.out.println(userinfo.getPicture());
			userinfo.toPrettyString();*/

		return new ResponseEntity<>(me.toString(), HttpStatus.OK);

	}


	@RequestMapping(value = "/labels", method = RequestMethod.GET, params = "code",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> getLabels(@RequestParam(value = "code") String code) throws IOException, JSONException {

		client = new com.google.api.services.gmail.Gmail.Builder(httpTransport, JSON_FACTORY, credential)
				.setApplicationName(APPLICATION_NAME).build();

		String userId = "me";
		ListLabelsResponse labelsResponse = client.users().labels().list(userId).execute();

		JSONArray labelArray = new JSONArray();
		for (Label l : labelsResponse.getLabels()) {
			Label label = client.users().labels().get(userId, l.getId()).execute();
			JSONObject labelJSON = new JSONObject();
			labelJSON.put("name", label.getName());
			if(label.getLabelListVisibility() != null) {
				labelJSON.put("labelListVisibility", label.getLabelListVisibility());
			} else {
				labelJSON.put("labelListVisibility", "labelShow");
			}
			if(label.getMessageListVisibility() != null) {
				labelJSON.put("messageListVisibility", label.getMessageListVisibility());
			} else {
				labelJSON.put("messageListVisibility", "show");
			}

			labelJSON.put("messagesTotal", label.getMessagesTotal());
			labelJSON.put("messagesUnread", label.getMessagesUnread());

			labelArray.put(labelJSON);
		}

		return new ResponseEntity<>(labelArray.toString(), HttpStatus.OK);

	}


	@RequestMapping(value = "/allMessages", method = RequestMethod.GET, params = "code",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> getAllMessages(@RequestParam(value = "code") String code) throws IOException, JSONException, ParseException {

		client = new com.google.api.services.gmail.Gmail.Builder(httpTransport, JSON_FACTORY, credential)
				.setApplicationName(APPLICATION_NAME).build();

		String userId = "me";
		ListMessagesResponse msgResponse = client.users().messages().list(userId).execute();

		JSONArray messageArray = new JSONArray();
		for (Message msg : msgResponse.getMessages()) {

			Message message = client.users().messages().get(userId, msg.getId()).execute();

			JSONObject messageJSON = service.fetchMessage(message);
			messageArray.put(messageJSON);
		}

		return new ResponseEntity<>(messageArray.toString(), HttpStatus.OK);

	}

	@RequestMapping(value = "/messages", method = RequestMethod.GET, params = "code",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> getMessages(@RequestParam(value = "code") String code, @RequestParam(value = "label") String l) throws IOException, JSONException, ParseException {

		client = new com.google.api.services.gmail.Gmail.Builder(httpTransport, JSON_FACTORY, credential)
				.setApplicationName(APPLICATION_NAME).build();

		String userId = "me";

		List<String> labelIds = new ArrayList<>();
		labelIds.add(l);
		ListMessagesResponse msgResponse = client.users().messages().list(userId).setLabelIds(labelIds).execute();

		JSONArray messageArray = new JSONArray();
		for (Message msg : msgResponse.getMessages()) {

			Message message = client.users().messages().get(userId, msg.getId()).execute();

			JSONObject messageJSON = service.fetchMessage(message);
			messageArray.put(messageJSON);
		}	

		return new ResponseEntity<>(messageArray.toString(), HttpStatus.OK);

	}


	@RequestMapping(value = "/message", method = RequestMethod.GET, params = "code",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> getMessage(@RequestParam(value = "code") String code, @RequestParam(value = "id") String id) throws JSONException, ParseException, IOException {

		client = new com.google.api.services.gmail.Gmail.Builder(httpTransport, JSON_FACTORY, credential)
				.setApplicationName(APPLICATION_NAME).build();

		String userId = "me";

		JSONObject messageJSON = new JSONObject();
		Message message = client.users().messages().get(userId, id).setFormat("full").execute();
		messageJSON = service.fetchFullMessage(message);

		return new ResponseEntity<>(messageJSON.toString(), HttpStatus.OK);

	}

	@RequestMapping(value = "/send", method = RequestMethod.POST, params = "code",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> sendMessage(@RequestParam(value = "code") String code, @RequestBody String body) throws JSONException, IOException, MessagingException {		

		JSONObject messageJSON = new JSONObject();

		client = new com.google.api.services.gmail.Gmail.Builder(httpTransport, JSON_FACTORY, credential)
				.setApplicationName(APPLICATION_NAME).build();

		String userId = "me";

		Message temp = service.prepareForSend(body, userId);

		Message message = client.users().messages().send(userId, temp).execute();
		messageJSON.put("message", message);

		return new ResponseEntity<>(messageJSON.toString(), HttpStatus.OK);

	}

}
