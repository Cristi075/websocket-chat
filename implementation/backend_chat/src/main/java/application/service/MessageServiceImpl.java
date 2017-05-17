package application.service;

import application.model.Conversation;
import application.model.Message;
import application.repositories.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {

    @Autowired
    private MessageRepository messageRepository;

    public List<Message> findAll() {
        return this.messageRepository.findAll();
    }

    public List<Message> findByConversation(Conversation conversation) {
        return this.messageRepository.findByConversation(conversation);
    }

    public Message save(Message message) {
        return this.messageRepository.save(message);
    }
}
