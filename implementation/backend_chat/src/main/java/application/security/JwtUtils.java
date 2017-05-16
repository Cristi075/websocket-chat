package application.security;

import com.sun.org.apache.xpath.internal.operations.Bool;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class JwtUtils {

    static final long EXPIRATIONTIME =  7200000; // Tokens will expire in 2 hours
    static final String SECRET = "s3cre7";

    public String generateToken(UserDetails userDetails){
        List<String> roles = new ArrayList<String>();

        for (GrantedAuthority authority: userDetails.getAuthorities()){
            roles.add(authority.toString().replace("ROLE_",""));
        }

        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .claim("roles",roles)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
                .signWith(SignatureAlgorithm.HS512,SECRET)
                .compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails){
        if(!this.getUsernameFromToken(token).equals(userDetails.getUsername()))
            return false;

        Date expirationDate = this.getExpirationDateFromToken(token);
        Date currentDate = new Date(System.currentTimeMillis());

        if(expirationDate.before(currentDate))
            return false;

        return true;
    }

    public String getUsernameFromToken(String token){
        if(token == null)
            return null;

        String username;

        try{
            Claims claims = this.getClaimsFromToken(token);
            username = claims.getSubject();

        } catch (Exception e){
            username = null;
        }

        return username;
    }

    public Date getExpirationDateFromToken(String token){
        Date date;

        try {
            Claims claims = this.getClaimsFromToken(token);
            date = claims.getExpiration();
        } catch (Exception e){
            date = null;
        }

        return date;
    }

    private Claims getClaimsFromToken(String token) {
        Claims claims;

        try {
            claims = Jwts.parser()
                    .setSigningKey(SECRET)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e){
            claims = null;
        }

        return claims;
    }
}
