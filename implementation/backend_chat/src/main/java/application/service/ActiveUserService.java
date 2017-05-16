package application.service;

import application.model.User;

import java.util.Set;

public interface ActiveUserService {
    void addSession(User user, String sessionId);

    void removeSession(String sessionId);

    Set<User> getAllActiveUsers();
}
