package tn.arctic.nexus.controllers.UsersModule;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.Config.JwtUtil;
import tn.arctic.nexus.entities.AuthRequest;
import tn.arctic.nexus.entities.AuthResponse;
import tn.arctic.nexus.entities.User;
import tn.arctic.nexus.repositories.UsersModule.IUserRepository;
import tn.arctic.nexus.services.UsersModule.AuthService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;
    private final IUserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody User user) {
        if (!checkEmailUnique(user.getEmail())) {
            return ResponseEntity.badRequest().body(new AuthResponse("L'email est déjà utilisé."));
        }
        if (!checkPhoneUnique(user.getPhoneNumber())) {
            return ResponseEntity.badRequest().body(new AuthResponse("Le numéro de téléphone est déjà utilisé."));
        }

        User savedUser = authService.register(user);
        String token = jwtUtil.generateToken(savedUser);
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        User user = authService.loadUserByEmail(request.getEmail());
        if (authService.checkPassword(request.getPassword(), user.getPassword())) {
            String token = jwtUtil.generateToken(user);
            return ResponseEntity.ok(new AuthResponse(token));
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        try {
            if (userRepository.findByEmail(email) == null) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("success", false);
                errorResponse.put("message", "Aucun utilisateur trouvé avec cet email");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }

            authService.sendOtpByEmail(email);

            Map<String, Object> successResponse = new HashMap<>();
            successResponse.put("success", true);
            successResponse.put("message", "Code de vérification envoyé par email !");
            return ResponseEntity.ok(successResponse);

        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Erreur lors de l'envoi de l'OTP : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }




    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam String email,
                                           @RequestParam String otp,
                                           @RequestParam String newPassword) {
        try {
            authService.resetPassword(email, otp, newPassword);
            return ResponseEntity.ok("Mot de passe réinitialisé !");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erreur : " + e.getMessage());
        }
    }

    @GetMapping("/check-email/{email}")
    public boolean checkEmailUnique(@PathVariable String email) {
        return userRepository.findByEmail(email) == null;
    }

    @GetMapping("/check-phone/{phoneNumber}")
    public boolean checkPhoneUnique(@PathVariable String phoneNumber) {
        return userRepository.findByPhoneNumber(phoneNumber) == null;
    }
}
