package application.model.builders;

import application.model.Role;
import application.model.User;

import java.util.Set;

public class UserBuilder {
    private String username;
    private String password;
    private String fullName;
    private Set<Role> roles;

    public UserBuilder setUsername(String username) {
        this.username = username;
        return this;
    }

    public UserBuilder setPassword(String password) {
        this.password = password;
        return this;
    }

    public UserBuilder setFullName(String fullName) {
        this.fullName = fullName;
        return this;
    }

    public UserBuilder setRoles(Set<Role> roles) {
        this.roles = roles;
        return this;
    }

    public User createUser() {
        return new User(username, password, fullName, roles);
    }
}