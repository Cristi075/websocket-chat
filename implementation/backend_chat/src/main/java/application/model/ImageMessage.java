package application.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Lob;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.Base64;
import java.util.Date;

@Entity
@DiscriminatorValue("image")
public class ImageMessage extends Message{

    @JsonIgnore
    @Column(name="image")
    @Lob
    private Blob image;

    public ImageMessage() {
        super();
    }

    public ImageMessage(String content, Date sentAt, User author, Conversation conversation, Blob image) {
        super(content, sentAt, author, conversation);
        this.image = image;
    }

    @JsonProperty
    public String getImage() {

        byte[] binary = new byte[0];
        try {
            binary = this.image.getBytes(1, (int)this.image.length());
        } catch (SQLException e) {
            e.printStackTrace();
        }
        String dataStr = new String(binary);

        return dataStr;
    }

    public void setImage(Blob image) {
        this.image = image;
    }
}
