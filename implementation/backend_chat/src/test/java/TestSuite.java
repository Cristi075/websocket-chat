import application.service.ConversationServiceTest;
import application.service.UserServiceTest;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({
        UserServiceTest.class,
        ConversationServiceTest.class,
})
public class TestSuite{
}
