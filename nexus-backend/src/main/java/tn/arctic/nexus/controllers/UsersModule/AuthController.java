package tn.arctic.nexus.controllers.UsersModule;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.Config.JwtUtil;
import tn.arctic.nexus.entities.AuthRequest;
import tn.arctic.nexus.entities.AuthResponse;
import tn.arctic.nexus.entities.User;
import tn.arctic.nexus.services.UsersModule.AuthService;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody User user) {
        User savedUser = authService.register(user);
        String token = jwtUtil.generateToken(savedUser);
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        User foundUser = authService.loadUserByEmail(request.getEmail());

        if (authService.checkPassword(request.getPassword(), foundUser.getPassword())) {
            String token = jwtUtil.generateToken(foundUser);
            return ResponseEntity.ok(new AuthResponse(token));
        }

        return ResponseEntity.status(401).body("Invalid credentials");
    }
}
