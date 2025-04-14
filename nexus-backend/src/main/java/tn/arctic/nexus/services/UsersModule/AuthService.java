package tn.arctic.nexus.services.UsersModule;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.User;
import tn.arctic.nexus.repositories.UsersModule.IUserRepository;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User loadUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        return user;
    }


    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
    public User loadUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }


    /*api sms forget password */

    private final SmsService smsService;

    // Temporaire : stock OTP (en prod -> Redis ou DB)
    private Map<String, String> otpStore = new HashMap<>();

    public void sendOtpBySms(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null || user.getPhoneNumber() == null) {
            throw new RuntimeException("Utilisateur introuvable ou numéro manquant");
        }

        String code = String.valueOf(new Random().nextInt(900000) + 100000); // 6 chiffres
        otpStore.put(email, code);

        String message = "Votre code de réinitialisation Nexus : " + code;
        smsService.sendSMS(user.getPhoneNumber(), message);
    }

    public boolean verifyOtp(String email, String otp) {
        return otp.equals(otpStore.get(email));
    }

    public void resetPassword(String email, String otp, String newPassword) {
        if (!verifyOtp(email, otp)) {
            throw new RuntimeException("Code invalide");
        }

        User user = userRepository.findByEmail(email);
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        otpStore.remove(email); // Supprimer OTP après succès
    }
}
