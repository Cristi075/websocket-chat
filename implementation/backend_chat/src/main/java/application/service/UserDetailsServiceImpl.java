package application.service;

import application.model.Role;
import application.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{

    @Autowired
    private UserService userService;

    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.userService.findByUsername(username);

        if(user == null) {
            throw new UsernameNotFoundException("Username not found.");
        } else {
            return new org.springframework.security.core.userdetails.User(
                    user.getUsername(),
                    user.getPassword(),
                    true, // Enabled
                    true, // Account not expired
                    true, // Credentials not expired
                    true, // Account not locked
                    getAuthorities(user));
        }
    }

    public List<GrantedAuthority> getAuthorities(User user){
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();

        for(Role role: user.getRoles()){
            // Role names should begin with the prefix ROLE_
            authorities.add(new SimpleGrantedAuthority("ROLE_"+role.getName()));
        }

        return authorities;
    }
}
