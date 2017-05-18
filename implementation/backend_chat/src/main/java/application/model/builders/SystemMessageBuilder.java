package application.model.builders;

import application.model.Conversation;
import application.model.SystemMessage;
import application.model.User;

import java.util.Date;

public class SystemMessageBuilder {
    private String content;
    private Date sentAt = new Date(System.currentTimeMillis());
    private User author;
    private Conversation conversation;
    private String level;

    public SystemMessageBuilder setContent(String content) {
        this.content = content;
        return this;
    }

    public SystemMessageBuilder setAuthor(User author) {
        this.author = author;
        return this;
    }

    public SystemMessageBuilder setConversation(Conversation conversation) {
        this.conversation = conversation;
        return this;
    }

    public SystemMessageBuilder setLevel(String level) {
        this.level = level;
        return this;
    }

    public SystemMessage createSystemMessage() {
        return new SystemMessage(content, sentAt, author, conversation, level);
    }
}