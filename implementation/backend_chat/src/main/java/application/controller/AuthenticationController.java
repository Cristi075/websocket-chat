package application.controller;

import application.security.AuthResponse;
import application.security.Credentials;
import application.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @RequestMapping(value = "/login/", method = RequestMethod.POST)
    public ResponseEntity<?> login(@RequestBody Credentials credentials){
        String username = credentials.getUsername();
        String password = credentials.getPassword();

        if (username == null || password == null){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

        String token = this.authenticationService.login(credentials);

        return new ResponseEntity(new AuthResponse(token),HttpStatus.OK);
    }
}
