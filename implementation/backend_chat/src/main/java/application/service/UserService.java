package application.service;

import application.exceptions.DuplicateException;
import application.model.User;

import java.util.List;

public interface UserService {

    User findById(int id);

    User findByUsername(String username);

    List<User> findAllUsers();

    User saveUser(User user)  throws DuplicateException;

    User updateUser(User user)  throws DuplicateException;

    void deleteUserById(int id);

}
