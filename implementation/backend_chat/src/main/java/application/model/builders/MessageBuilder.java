package application.model.builders;

import application.model.Conversation;
import application.model.Message;
import application.model.User;

import java.util.Date;

public class MessageBuilder {
    private String content;
    private Date sentAt;
    private User author;
    private Conversation conversation;

    public MessageBuilder setContent(String content) {
        this.content = content;
        return this;
    }

    public MessageBuilder setSentAt(Date sentAt) {
        this.sentAt = sentAt;
        return this;
    }

    public MessageBuilder setAuthor(User author) {
        this.author = author;
        return this;
    }

    public MessageBuilder setConversation(Conversation conversation) {
        this.conversation = conversation;
        return this;
    }

    public Message createMessage() {
        return new Message(content, sentAt, author, conversation);
    }
}