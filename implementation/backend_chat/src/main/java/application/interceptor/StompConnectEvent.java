package application.interceptor;

import application.model.User;
import application.service.ActiveUserService;
import application.service.UserService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;

@Component
public class  StompConnectEvent implements ApplicationListener<SessionConnectEvent> {

    @Autowired
    private UserService userService;

    @Autowired
    private ActiveUserService activeUserService;

    public void onApplicationEvent(SessionConnectEvent event) {
        StompHeaderAccessor sha = StompHeaderAccessor.wrap(event.getMessage());

        User user = this.userService.findByUsername(sha.getLogin());

        this.activeUserService.addSession(user, sha.getSessionId());
    }
}