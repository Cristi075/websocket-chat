package application.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Lob;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.Date;

@Entity
@DiscriminatorValue("file")
public class FileMessage extends Message{

    @JsonIgnore
    @Column(name="file")
    @Lob
    private Blob file;

    @JsonIgnore
    @Column(name="fileName")
    private String fileName;

    public FileMessage(String content, Date sentAt, User author, Conversation conversation, Blob file, String fileName) {
        super(content, sentAt, author, conversation);
        this.file = file;
        this.fileName = fileName;
    }

    public FileMessage() {
    }

    @JsonProperty
    public String getFile() {

        byte[] binary = new byte[0];
        try {
            binary = this.file.getBytes(1, (int)this.file.length());
        } catch (SQLException e) {
            e.printStackTrace();
        }
        String dataStr = new String(binary);

        return dataStr;
    }

    public void setFile(Blob file) {
        this.file = file;
    }

    @JsonProperty
    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }
}
