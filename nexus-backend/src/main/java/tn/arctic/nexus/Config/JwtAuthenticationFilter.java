package tn.arctic.nexus.Config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import tn.arctic.nexus.entities.User;
import tn.arctic.nexus.services.UsersModule.AuthService;

import java.io.IOException;
import java.util.Collections;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final AuthService authService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String token = authHeader.substring(7);
        System.out.println("Received token: " + token); // Log pour vérifier le token

        try {
            Long userId = jwtUtil.extractUserId(token);
            System.out.println("Extracted userId from token: " + userId); // Log pour vérifier l'ID extrait

            if (userId != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                User user = authService.loadUserById(userId); // 👈 utiliser loadUserById ici
                if (user == null) {
                    System.out.println("User not found for ID: " + userId); // Log si l'utilisateur n'est pas trouvé
                }
                if (user != null && jwtUtil.isTokenValid(token, user)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            user, null, Collections.emptyList());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    System.out.println("Authentication set for user ID: " + userId);
                } else {
                    System.out.println("Invalid token or user mismatch");
                }
            }
        } catch (Exception e) {
            System.out.println("Exception in JWT filter: " + e.getMessage());
        }

        filterChain.doFilter(request, response);
    }

}
