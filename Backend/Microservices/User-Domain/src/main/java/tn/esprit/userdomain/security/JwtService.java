package tn.esprit.userdomain.security;
import io.jsonwebtoken.io.Decoders;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import io.jsonwebtoken.Jwts;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import io.jsonwebtoken.Claims;


//@Service
public class JwtService {

    @Value("${application.security.jwt.expiration}")
    private Long  jwtEpiration;
    @Value("${application.security.jwt.secret-key}")
    private String secretKey;


    // will do anything related to the token
    public String generateJwtToken(UserDetails userDetails) {
    return generateJwt(new HashMap<>(), userDetails);
    }


    public String generateJwt(Map<String,Object> claims, UserDetails userDetails) {
        return buildToken(claims, userDetails , jwtEpiration);
    }

    private String buildToken(
            Map<String,Object> extraClaims,
            UserDetails userDetails ,
            long jwtEpiration) {

        var authorities = userDetails.getAuthorities()
            .stream()
            .map(GrantedAuthority::getAuthority)
            .toList();

    return Jwts.builder().setClaims(extraClaims)
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date(System.currentTimeMillis())).
            setExpiration(new Date(System.currentTimeMillis() + jwtEpiration ))
            .claim("authorities" , authorities)
            .signWith(getSignInKey())
            .compact();
    }

    private Key getSignInKey(){
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public boolean isTokenValid(String token , UserDetails userDetails) {
        final String userName = extractUserName(token);
        return userName.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public String extractUserName(String token) {
        return extractClaim(token , Claims::getSubject);
    }

    private <T> T extractClaim(String token, Function< Claims , T> claimsExtractor ) {
        final Claims claims = extractAllClaims(token);
        return claimsExtractor.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
