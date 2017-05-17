package application.controller;

import application.model.Conversation;
import application.model.Message;
import application.service.ConversationService;
import application.service.MessageService;
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
public class MessageRestApiController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private ConversationService conversationService;

    @RequestMapping(value = "/message/", method = RequestMethod.GET)
    public ResponseEntity<?> getAll() {

        List<Message> messages = this.messageService.findAll();

        if (messages.isEmpty()) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(messages, HttpStatus.OK);
    }

    @RequestMapping(value = "/message/convId={id}", method = RequestMethod.GET)
    public ResponseEntity<?> getByConversation(@PathVariable("id") int conversationId){
        Conversation conversation = this.conversationService.getById(conversationId);

        List<Message> messages = this.messageService.findByConversation(conversation);

        return new ResponseEntity<>(messages, HttpStatus.OK);
    }
}
