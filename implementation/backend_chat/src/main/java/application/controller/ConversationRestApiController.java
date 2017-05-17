package application.controller;

import application.model.Conversation;
import application.repositories.ConversationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ConversationRestApiController {

    @Autowired
    private ConversationRepository conversationRepository;

    @RequestMapping(value = "/conversation/", method = RequestMethod.GET)
    public ResponseEntity<?> listAll() {

        List<Conversation> conversations = this.conversationRepository.findAll();

        if (conversations.isEmpty()) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(conversations, HttpStatus.OK);
    }

}
