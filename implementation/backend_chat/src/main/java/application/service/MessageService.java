package application.service;

import application.model.Conversation;
import application.model.Message;

import java.util.List;

public interface MessageService {
    List<Message> findAll();

    List<Message> findByConversation(Conversation conversation);

    Message save(Message message);
}
