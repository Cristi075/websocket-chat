package application.controller;

import application.model.User;
import application.service.ActiveUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.util.Set;

@Controller
public class WebSocketController {

    @Autowired
    private ActiveUserService activeUserService;

    @MessageMapping("/echo")
    @SendToUser("/topic/echo")
    public String processMessageFromClient(@Payload String message, Principal principal){
        return message;
    }

    @SubscribeMapping("/topic/active")
    public Set<User> getActiveUsers(Principal principal){
        return this.activeUserService.getAllActiveUsers();
    }


}
