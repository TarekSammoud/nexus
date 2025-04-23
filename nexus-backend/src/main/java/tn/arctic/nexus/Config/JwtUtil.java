package tn.arctic.nexus.Config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import tn.arctic.nexus.entities.RoleType;
import tn.arctic.nexus.entities.User;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final long expirationMs = 86400000; // 1 jour
    private final String SECRET_KEY = "ton-secret-base64-encode-ou-une-longue-phrase-de-256-bits";
    private final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    public String generateToken(User user) {
        // Si le role est null, on le définit comme PLAYER
        if (user.getRoleType() == null) {
            user.setRoleType(RoleType.PLAYER);
        }

        // Génération du token avec le roleType
        String token = Jwts.builder()
                .setSubject(user.getEmail())
                .claim("id", user.getId()) // Ajouter l'ID utilisateur ici
                .claim("role", user.getRoleType().name()) // Ajouter le role dans le JWT
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(key)
                .compact();

        System.out.println("Generated token: " + token); // Log pour vérifier le jeton généré
        return token;
    }


    public Long extractUserId(String token) {
        try {
            Claims claims = getClaims(token);
            return claims.get("id", Integer.class).longValue(); // ou Long.class si tu veux directement un Long
        } catch (Exception e) {
            System.out.println("Error extracting userId from token: " + e.getMessage());
            throw e;
        }
    }

    public String extractEmail(String token) {
        try {
            Claims claims = getClaims(token);
            String email = claims.getSubject();
            System.out.println("Extracted email from token: " + email); // Log pour vérifier l'email extrait
            return email;
        } catch (Exception e) {
            System.out.println("Error extracting email from token: " + e.getMessage()); // Log d'erreur
            throw e;
        }
    }

    public boolean isTokenValid(String token, User user) {
        final String email = extractEmail(token);
        boolean isValid = email.equals(user.getEmail()) && !isTokenExpired(token);
        System.out.println("Token valid: " + isValid); // Log pour vérifier la validité du jeton
        return isValid;
    }

    private boolean isTokenExpired(String token) {
        return getClaims(token).getExpiration().before(new Date());
    }

    private Claims getClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build()
                .parseClaimsJws(token).getBody();
    }
}
