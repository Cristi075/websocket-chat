package application.service;

import application.security.Credentials;

public interface AuthenticationService {

    /**
     * Returns a Json Web Token for the corresponding user if the credentials are correct
     * @param credentials - The user's credentials
     * @return - The JWT if the credentials are correct, null if they aren't
     */
    public String login(Credentials credentials);
}
