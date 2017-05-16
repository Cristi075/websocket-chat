package application.service;

import application.model.Role;
import application.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService{

    @Autowired
    private RoleRepository roleRepository;

    public List<Role> findAllRoles() {
        return this.roleRepository.findAll();
    }

    public Role addRole(Role role) {
        return this.roleRepository.save(role);
    }

    public void deleteAll() {
        this.roleRepository.deleteAll();
    }
}
