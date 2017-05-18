package application.controller;


import application.model.Conversation;
import application.model.User;
import application.service.ConversationService;
import application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Controller
public class ConversationWsController {

    @Autowired
    private UserService userService;

    @Autowired
    private ConversationService conversationService;

    @Autowired
    private SimpMessagingTemplate template;

    @SubscribeMapping("/user/topic/conversation/{id}")
    public Conversation getConversation(@DestinationVariable("id") int id){
        return this.conversationService.getById(id);
    }

    @MessageMapping("/conversation/{id}")
    public void updateConversation(@DestinationVariable("id") int id, @Payload Conversation conversation){
        Set<User> users = new HashSet<>();
        Conversation current = this.conversationService.getById(conversation.getId());

        Set<User> initialMembers = current.getMembers();
        String initialName = current.getName();

        users.addAll(current.getMembers()); // users that will be notified

        Conversation updated = this.conversationService.updateConversation(conversation);

        users.addAll(updated.getMembers());

        if

        for(User user: users){
            this.template.convertAndSendToUser(user.getUsername(),"/topic/conversation/"+conversation.getId(), conversation);
        }

    }

    @SubscribeMapping("/user/topic/conversation-list")
    public List<Conversation> getConversationsForUser(Principal principal){
        User user = this.userService.findByUsername(principal.getName());

        List<Conversation> conversations = this.conversationService.getConversationsForUser(user);

        return conversations;
    }

}
