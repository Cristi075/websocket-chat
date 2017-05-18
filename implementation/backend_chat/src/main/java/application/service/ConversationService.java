package application.service;

import application.model.Conversation;
import application.model.User;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@SpringBootTest
@RunWith(SpringRunner.class)
@ActiveProfiles(profiles = "test")
public interface ConversationService {

    Conversation getById(int id);

    List<Conversation> getConversationsForUser(User user);

    List<Conversation> getAllConversations();

    Conversation createConversation(Conversation conversation);

    Conversation updateConversation(Conversation conversation);

    void deleteConversation(int id);
}
