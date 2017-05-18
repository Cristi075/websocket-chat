package application.controller;


import application.model.Conversation;
import application.model.SystemMessage;
import application.model.User;
import application.model.builders.SystemMessageBuilder;
import application.service.ConversationService;
import application.service.MessageService;
import application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
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
    private MessageService messageService;

    @Autowired
    private SimpMessagingTemplate template;

    @SubscribeMapping("/user/topic/conversation/{id}")
    public Conversation getConversation(@DestinationVariable("id") int id){
        return this.conversationService.getById(id);
    }

    @MessageMapping("/conversation/{id}")
    public void updateConversation(@DestinationVariable("id") int id, @Payload Conversation conversation, Principal principal){
        Set<User> users = new HashSet<>();
        Conversation current = this.conversationService.getById(conversation.getId());

        Set<User> initialMembers = current.getMembers();
        String initialName = current.getName();

        users.addAll(current.getMembers()); // users that will be notified

        Conversation updated = this.conversationService.updateConversation(conversation);

        users.addAll(updated.getMembers());

        SystemMessageBuilder builder = new SystemMessageBuilder();

        for(User user: users){
            this.template.convertAndSendToUser(user.getUsername(),"/topic/conversation/"+conversation.getId(), conversation);
        }

        builder.setAuthor(this.userService.findByUsername(principal.getName()))
                .setLevel("INFO")
                .setConversation(updated);

        if(!initialName.equals(updated.getName())){
            builder.setContent(principal.getName() + " renamed the conversation to " + updated.getName());
        } else {
            if(!initialMembers.equals(updated.getMembers())){
                if(initialMembers.containsAll(updated.getMembers())){
                    HashSet<User> tmp = new HashSet<>(initialMembers);
                    tmp.removeAll(updated.getMembers());
                    User removedMember = tmp.stream().findFirst().get();

                    builder.setContent(principal.getName() + " removed " + removedMember.getUsername());
                }

                if(updated.getMembers().containsAll(initialMembers)){
                    HashSet<User> tmp = new HashSet<>(updated.getMembers());
                    tmp.removeAll(initialMembers);
                    User addedMember = tmp.stream().findFirst().get();

                    builder.setContent(principal.getName() + " added " + addedMember.getUsername());
                }
            }
        }


        this.messageService.save(builder.createSystemMessage());

    }

    @SubscribeMapping("/user/topic/conversation-list")
    public List<Conversation> getConversationsForUser(Principal principal){
        User user = this.userService.findByUsername(principal.getName());

        List<Conversation> conversations = this.conversationService.getConversationsForUser(user);

        return conversations;
    }

    @MessageMapping("/conversation/new")
    @SendToUser("/topic/conversation-list")
    public List<Conversation> newConversation(@Payload Conversation conversation, Principal principal){
        User user = this.userService.findByUsername(principal.getName());

        Set<User> members = new HashSet<>();
        members.add(user);
        conversation.setMembers(members);
        this.conversationService.createConversation(conversation);

        List<Conversation> conversations = this.conversationService.getConversationsForUser(user);

        return conversations;
    }

}
