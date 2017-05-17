package application.model;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="Conversation")
public class Conversation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="name")
    private String name;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name="Conversation_has_User",
            joinColumns = { @JoinColumn(name = "conversationId")},
            inverseJoinColumns = { @JoinColumn(name = "userId")}
    )
    private Set<User> members;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<User> getMembers() {
        return members;
    }

    public void setMembers(Set<User> members) {
        this.members = members;
    }
}
