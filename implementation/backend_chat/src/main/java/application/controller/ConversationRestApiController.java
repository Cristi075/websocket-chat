package application.controller;

import application.model.Conversation;
import application.model.User;
import application.repositories.ConversationRepository;
import application.service.ConversationService;
import application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ConversationRestApiController {

    @Autowired
    private ConversationService conversationService;

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/conversation/", method = RequestMethod.GET)
    public ResponseEntity<?> listAll() {

        List<Conversation> conversations = this.conversationService.getAllConversations();

        if (conversations.isEmpty()) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(conversations, HttpStatus.OK);
    }

    @RequestMapping(value = "/conversation/userId={id}", method = RequestMethod.GET)
    public ResponseEntity<?> getByUser(@PathVariable("id") int userId) {
        User user = this.userService.findById(userId);

        List<Conversation> conversations = this.conversationService.getConversationsForUser(user);

        if (conversations.isEmpty()) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(conversations, HttpStatus.OK);
    }
}
