package application.service;

import application.model.Conversation;
import application.model.User;

import java.util.List;

public interface ConversationService {

    Conversation getById(int id);

    List<Conversation> getConversationsForUser(User user);

    List<Conversation> getAllConversations();

    Conversation createConversation(Conversation conversation);

    Conversation updateConversation(Conversation conversation);
}
