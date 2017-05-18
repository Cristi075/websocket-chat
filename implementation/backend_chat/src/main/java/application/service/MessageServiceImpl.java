package application.service;

import application.model.Conversation;
import application.model.Message;
import application.model.User;
import application.repositories.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {

    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    private MessageRepository messageRepository;

    public List<Message> findAll() {
        return this.messageRepository.findAll();
    }

    public List<Message> findByConversation(Conversation conversation) {
        return this.messageRepository.findByConversation(conversation);
    }

    public Message save(Message message) {
        Message created = this.messageRepository.save(message);

        List<Message> messages = this.findByConversation(message.getConversation());

        for(User member: message.getConversation().getMembers()){
            this.template.convertAndSendToUser(member.getUsername(),"/topic/messages/convId="+message.getConversation().getId(),messages);
        }

        return created;
    }
}
