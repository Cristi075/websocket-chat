package application.service;

import application.model.Conversation;
import application.repositories.ConversationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConversationServiceImpl implements ConversationService{

    @Autowired
    private ConversationRepository conversationRepository;

    public Conversation getById(int id) {
        return this.conversationRepository.findOne(id);
    }

    public List<Conversation> getAllConversations() {
        return this.conversationRepository.findAll();
    }

    public Conversation createConversation(Conversation conversation) {
        return this.conversationRepository.save(conversation);
    }

    public Conversation updateConversation(Conversation conversation) {
        Conversation updated = this.conversationRepository.save(conversation);
        return updated;
    }
}
