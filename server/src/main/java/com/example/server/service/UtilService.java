package com.example.server.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.google.api.services.gmail.GmailScopes;

@Service
public class UtilService {

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
