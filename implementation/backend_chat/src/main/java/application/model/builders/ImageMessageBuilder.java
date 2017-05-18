package application.model.builders;

import application.model.Conversation;
import application.model.ImageMessage;
import application.model.User;

import java.sql.Blob;
import java.util.Date;

public class ImageMessageBuilder {
    private String content = null;
    private Date sentAt = new Date(System.currentTimeMillis());
    private User author;
    private Conversation conversation;
    private Blob image;

    public ImageMessageBuilder setAuthor(User author) {
        this.author = author;
        return this;
    }

    public ImageMessageBuilder setConversation(Conversation conversation) {
        this.conversation = conversation;
        return this;
    }

    public ImageMessageBuilder setImage(Blob image) {
        this.image = image;
        return this;
    }

    public ImageMessage createImageMessage() {
        return new ImageMessage(content, sentAt, author, conversation, image);
    }
}