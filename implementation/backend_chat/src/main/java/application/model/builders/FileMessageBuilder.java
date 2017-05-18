package application.model.builders;

import application.model.Conversation;
import application.model.FileMessage;
import application.model.User;

import java.sql.Blob;
import java.util.Date;

public class FileMessageBuilder {
    private String content;
    private Date sentAt = new Date(System.currentTimeMillis());;
    private User author;
    private Conversation conversation;
    private Blob file;
    private String fileName;

    public FileMessageBuilder setContent(String content) {
        this.content = content;
        return this;
    }

    public FileMessageBuilder setAuthor(User author) {
        this.author = author;
        return this;
    }

    public FileMessageBuilder setConversation(Conversation conversation) {
        this.conversation = conversation;
        return this;
    }

    public FileMessageBuilder setFile(Blob file) {
        this.file = file;
        return this;
    }

    public FileMessageBuilder setFileName(String fileName) {
        this.fileName = fileName;
        return this;
    }

    public FileMessage createFileMessage() {
        return new FileMessage(content, sentAt, author, conversation, file, fileName);
    }
}