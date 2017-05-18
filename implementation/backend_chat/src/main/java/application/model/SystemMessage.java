package application.model;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.util.Date;

@Entity
@DiscriminatorValue("system")
public class SystemMessage extends Message {

    @Column(name="level")
    private String level;

    public SystemMessage(String content, Date sentAt, User author, Conversation conversation, String level) {
        super(content, sentAt, author, conversation);
        this.level = level;
    }

    public SystemMessage() {
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }
}
