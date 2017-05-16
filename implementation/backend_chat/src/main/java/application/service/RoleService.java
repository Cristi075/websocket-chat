package application.service;

import application.model.Role;

import java.util.List;

public interface RoleService {
    List<Role> findAllRoles();

    Role addRole(Role role);

    void deleteAll();
}
