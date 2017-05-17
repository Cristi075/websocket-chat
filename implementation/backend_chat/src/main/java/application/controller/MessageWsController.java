package application.controller;

import application.model.Conversation;
import application.model.Message;
import application.model.User;
import application.service.ConversationService;
import application.service.MessageService;
import application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.util.Date;
import java.util.List;

@Controller
public class MessageWsController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    @Autowired
    private ConversationService conversationService;

    @Autowired
    private SimpMessagingTemplate template;

    @SubscribeMapping("/user/topic/messages/convId={id}")
    public List<Message> getMessagesByConversation(@DestinationVariable("id") int conversationId){
        Conversation conversation = this.conversationService.getById(conversationId);

        List<Message> messages = this.messageService.findByConversation(conversation);

        return messages;
    }

    @MessageMapping("/message/convId={id}")
    public void newMessage(@DestinationVariable("id") int conversationId, @Payload Message message, Principal principal){
        Conversation conversation = this.conversationService.getById(conversationId);
        User author = userService.findByUsername(principal.getName());

        message.setAuthor(author);
        message.setConversation(conversation);
        message.setSentAt(new Date(System.currentTimeMillis()));

        this.messageService.save(message);

        List<Message> messages = this.messageService.findByConversation(conversation);

        for(User member: conversation.getMembers()){
            this.template.convertAndSendToUser(member.getUsername(),"/topic/messages/convId="+conversation.getId(),messages);
        }
    }
}
