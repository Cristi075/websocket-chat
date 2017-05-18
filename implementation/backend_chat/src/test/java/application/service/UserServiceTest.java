package application.service;

import application.model.Role;
import application.model.User;
import application.model.builders.UserBuilder;
import application.repositories.RoleRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.HashSet;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

@SpringBootTest
@RunWith(SpringRunner.class)
@ActiveProfiles(profiles = "test")
public class UserServiceTest {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleRepository roleRepository;

    private UserBuilder builder;
    private User newUser;

    private Role role1;
    private Role role2;

    @Before
    public void setUp() throws Exception {
        this.builder = new UserBuilder();

        this.role1=this.roleRepository.save(new Role("ROLE_1"));
        this.role2=this.roleRepository.save(new Role("ROLE_2"));

        this.newUser = this.builder
                .setUsername("Test_username")
                .setPassword("Test_Password_1")
                .setFullName("Test Full Name")
                .addRole(this.role1)
                .createUser();

        this.newUser = this.userService.saveUser(this.newUser);
    }

    @After
    public void tearDown() throws Exception {
        for(User user: this.userService.findAllUsers()){
            this.userService.deleteUserById(user.getId());
        }

        this.roleRepository.deleteAll();
    }

    @Test
    public void findById() throws Exception {
        User user = this.userService.findById(this.newUser.getId());

        assertEquals(this.newUser,user);
    }

    @Test
    public void findByUsername() throws Exception {
        User user = this.userService.findByUsername(this.newUser.getUsername());

        assertEquals(this.newUser,user);
    }

    @Test
    public void saveUser() throws Exception {
        User user = this.builder
                .setUsername("New_username_2")
                .setPassword("random_password")
                .setFullName("Yet Another Full Name")
                .addRole(this.role1)
                .addRole(this.role2)
                .createUser();

        User created = this.userService.saveUser(user);

        assertNotNull(created);

    }

    @Test
    public void updateUser() throws Exception {
        User user = this.userService.findById(this.newUser.getId());
        assertEquals(this.newUser,user);

        HashSet<Role> newRoles = new HashSet<>();
        newRoles.add(this.role2);
        user.setUsername("New_Username");
        user.setPassword("New passWord");
        user.setFullName("New FullName");
        user.setRoles(newRoles);

        this.userService.updateUser(user);
        User updated = this.userService.findById(this.newUser.getId());

        assertEquals(user,updated);
    }

    @Test
    public void deleteUserById() throws Exception {
        User user = this.userService.findById(this.newUser.getId());
        assertNotNull(user);

        this.userService.deleteUserById(this.newUser.getId());

        user = this.userService.findById(this.newUser.getId());
        assertNull(user);
    }

}