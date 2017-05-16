package application.service;

import application.model.User;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ActiveUserServiceImpl implements ActiveUserService{

    private final Log logger = LogFactory.getLog(ActiveUserServiceImpl.class);

    private Map<User, List<String>> activeUsers = new HashMap<>();

    @Autowired
    private SimpMessagingTemplate template;


    public void addSession(User user, String sessionId) {
        if(this.activeUsers.containsKey(user)){
            this.activeUsers.get(user).add(sessionId);
        } else {
            List<String> sessions = new ArrayList<>();
            sessions.add(sessionId);
            this.activeUsers.put(user,sessions);
            logger.info("User "+user.getUsername()+ " connected");
            template.convertAndSend("/topic/active", this.getAllActiveUsers());
        }
    }

    public void removeSession(String sessionId) {
        User user = this.getUserFromSession(sessionId);

        if(user!=null){
            List<String> sessions = this.activeUsers.get(user);
            sessions.remove(sessionId);
            if(sessions.isEmpty()){
                this.activeUsers.remove(user);
                logger.info("User "+user.getUsername()+" disconnected");
                template.convertAndSend("/topic/active", this.getAllActiveUsers());
            }
        }
    }

    private User getUserFromSession(String sessionId){
        for(User user: this.activeUsers.keySet()){
            for(String sid: this.activeUsers.get(user)){
                if(sid.equals(sessionId)){
                    return user;
                }
            }
        }

        return null;
    }

    public Set<User> getAllActiveUsers() {
        return this.activeUsers.keySet();
    }
}
