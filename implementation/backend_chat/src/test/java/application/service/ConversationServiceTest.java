package application.service;

import application.model.Conversation;
import application.model.Role;
import application.model.User;
import application.model.builders.UserBuilder;
import application.repositories.RoleRepository;
import application.repositories.UserRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.HashSet;
import java.util.Set;

import static org.junit.Assert.*;


@SpringBootTest
@RunWith(SpringRunner.class)
@ActiveProfiles(profiles = "test")
public class ConversationServiceTest {

    @Autowired
    private ConversationService conversationService;

    @Autowired
    private UserRepository userRepository;

    private Conversation conversation;
    private UserBuilder userBuilder;

    private User user1;
    private User user2;

    @Before
    public void setUp() throws Exception {
        this.userBuilder = new UserBuilder();

        this.user1= this.userBuilder
                .setUsername("Test_username")
                .setPassword("Test_Password_1")
                .setFullName("Test Full Name")
                .createUser();

        this.user2= this.userBuilder
                .setUsername("Test_username_2")
                .setPassword("Test_P@$$word_1")
                .setFullName("New Full Name")
                .createUser();

        this.user1 = this.userRepository.save(this.user1);
        this.user2 = this.userRepository.save(this.user2);

        Set<User> members = new HashSet<>();
        members.add(this.user1);

        this.conversation = new Conversation("Test name", members);
        this.conversation = this.conversationService.createConversation(this.conversation);
    }

    @After
    public void tearDown() throws Exception {
        for(Conversation conversation: this.conversationService.getAllConversations()){
            this.conversationService.deleteConversation(conversation.getId());
        }

        this.userRepository.deleteAll();
    }

    @Test
    public void getById() throws Exception {
        Conversation conversation = this.conversationService.getById(this.conversation.getId());

        assertEquals(this.conversation,conversation);
    }

    @Test
    public void createConversation() throws Exception {
        Set<User> members = new HashSet<>();
        members.add(this.user2);

        this.conversation = new Conversation("Another name", members);

        Conversation created = this.conversationService.createConversation(conversation);

        assertNotNull(created);
    }

    @Test
    public void updateConversation() throws Exception {
        Conversation old = this.conversationService.getById(this.conversation.getId());
        assertEquals(this.conversation,old);

        HashSet<User> newMembers = new HashSet<>();
        newMembers.add(this.user1);
        newMembers.add(this.user2);
        old.setName("Changed name");
        old.setMembers(newMembers);

        this.conversationService.updateConversation(old);
        Conversation updated = this.conversationService.getById(this.conversation.getId());

        assertEquals(old,updated);
    }

}