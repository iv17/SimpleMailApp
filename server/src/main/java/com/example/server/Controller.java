package com.example.server;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import com.google.api.services.gmail.GmailScopes;
import com.google.api.services.gmail.model.Label;
import com.google.api.services.gmail.model.ListLabelsResponse;
import com.google.api.services.gmail.model.ListMessagesResponse;
import com.google.api.services.gmail.model.Message;


@RestController
public class Controller {

	private static final String APPLICATION_NAME = "GmailAlexa";
	private static HttpTransport httpTransport;
	private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
	private static Gmail client;

	GoogleClientSecrets clientSecrets;
	GoogleAuthorizationCodeFlow flow;
	Credential credential;

	@Value("${gmail.client.clientId}")
	private String clientId;

	@Value("${gmail.client.clientSecret}")
	private String clientSecret;

	@Value("${gmail.client.redirectUri}")
	private String redirectUri;

	@RequestMapping(value = "/login/gmail", method = RequestMethod.GET)
	public RedirectView googleConnectionStatus(HttpServletRequest request) throws Exception {
		return new RedirectView(authorize());
	}

	@RequestMapping(value = "/login/gmailCallback2", method = RequestMethod.GET, params = "code")
	public ResponseEntity<String> getMessages(@RequestParam(value = "code") String code) {

		JSONObject json = new JSONObject();
		JSONArray arr = new JSONArray();


		try {
			TokenResponse response = flow.newTokenRequest(code).setRedirectUri(redirectUri).execute();
			credential = flow.createAndStoreCredential(response, "userID");

			client = new com.google.api.services.gmail.Gmail.Builder(httpTransport, JSON_FACTORY, credential)
					.setApplicationName(APPLICATION_NAME).build();


			String userId = "me";
			ListMessagesResponse msgResponse = client.users().messages().list(userId).execute();

			List<Message> messages = new ArrayList<>();

			for (Message msg : msgResponse.getMessages()) {

				messages.add(msg);
				Message message = client.users().messages().get(userId, msg.getId()).execute();
				arr.put(message.getSnippet());

			}
			json.put("response", arr);

			for (Message msg : messages) {

				System.out.println("msg: " + msg.toPrettyString());
			}

		} catch (Exception e) {

			System.out.println("exception cached ");
			e.printStackTrace();
		}

		return new ResponseEntity<>(json.toString(), HttpStatus.OK);

	}
	
	@RequestMapping(value = "/login/gmailCallback", method = RequestMethod.GET, params = "code")
	public ResponseEntity<String> listLabels(@RequestParam(value = "code") String code) throws IOException {
		
		JSONObject json = new JSONObject();

		try {
			TokenResponse response = flow.newTokenRequest(code).setRedirectUri(redirectUri).execute();
			credential = flow.createAndStoreCredential(response, "userID");

			client = new com.google.api.services.gmail.Gmail.Builder(httpTransport, JSON_FACTORY, credential)
					.setApplicationName(APPLICATION_NAME).build();

			String userId = "me";
			ListLabelsResponse labelsResponse = client.users().labels().list(userId).execute();
			List<Label> labels = labelsResponse.getLabels();
			
			json.put("response", labels);

		
		} catch (Exception e) {

			System.out.println("exception cached ");
			e.printStackTrace();
		}

		return new ResponseEntity<>(json.toString(), HttpStatus.OK);
	  
	  }
	
	private String authorize() throws Exception {
		AuthorizationCodeRequestUrl authorizationUrl;
		if (flow == null) {
			Details web = new Details();
			web.setClientId(clientId);
			web.setClientSecret(clientSecret);
			clientSecrets = new GoogleClientSecrets().setWeb(web);
			httpTransport = GoogleNetHttpTransport.newTrustedTransport();
			flow = new GoogleAuthorizationCodeFlow.Builder(httpTransport, JSON_FACTORY, clientSecrets,
					Collections.singleton(GmailScopes.GMAIL_READONLY)).build();
		}
		authorizationUrl = flow.newAuthorizationUrl().setRedirectUri(redirectUri);

		return authorizationUrl.build();
	}

}
