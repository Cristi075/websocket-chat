package application.service;

import application.model.User;

import java.util.List;

public interface UserService {

    User findById(int id);

    User findByUsername(String username);

    List<User> findAllUsers();

    User saveUser(User user);

    User updateUser(User user);

    void deleteUserById(int id);

}
