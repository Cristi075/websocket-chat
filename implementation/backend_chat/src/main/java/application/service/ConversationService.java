package application.service;

import application.model.Conversation;

import java.util.List;

public interface ConversationService {

    Conversation getById(int id);

    List<Conversation> getAllConversations();

    Conversation createConversation(Conversation conversation);

    Conversation updateConversation(Conversation conversation);
}
