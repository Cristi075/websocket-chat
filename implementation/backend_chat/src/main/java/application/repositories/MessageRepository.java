package application.repositories;

import application.model.Conversation;
import application.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer>{
    List<Message> findByConversation(Conversation conversation);
}
