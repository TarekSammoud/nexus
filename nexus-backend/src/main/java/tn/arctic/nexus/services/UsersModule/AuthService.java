package tn.arctic.nexus.services.UsersModule;

import com.restfb.DefaultFacebookClient;
import com.restfb.FacebookClient;
import com.restfb.Version;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.controllers.UsersModule.VerificationCodeGenerator;
import tn.arctic.nexus.entities.User;
import tn.arctic.nexus.entities.UserVerification;
import tn.arctic.nexus.repositories.UsersModule.IUserRepository;
import tn.arctic.nexus.repositories.UsersModule.IUsersModuleUserVerificationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import org.springframework.beans.factory.annotation.Value;

@RequiredArgsConstructor
@Service
public class AuthService {

    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final IUsersModuleUserVerificationRepository verificationRepository;

    @Qualifier("userEmailService")
    private final EmailService emailService;

    // Enregistrement de l'utilisateur avec le mot de passe crypté
    public User register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Encrypte le mot de passe
        return userRepository.save(user); // Sauvegarde l'utilisateur
    }

    // Chargement d'un utilisateur par son email
    public User loadUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("Utilisateur non trouvé"); // Lancer une exception si l'utilisateur n'est pas trouvé
        }
        return user;
    }

    // Vérification du mot de passe (brut vs crypté)
    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword); // Vérifie que le mot de passe correspond
    }

    // Chargement de l'utilisateur par son ID
    public User loadUserById(Long id) {
        return userRepository.findById(id).orElse(null); // Retourne l'utilisateur si trouvé, sinon null
    }

    public void sendOtpByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("Utilisateur introuvable !");
        }

        String code = VerificationCodeGenerator.generateVerificationCode(); // Génère le code OTP

        // Recherche si un code de vérification existe déjà pour cet email
        UserVerification verification = verificationRepository.findByEmail(email);
        if (verification == null) {
            verification = new UserVerification(); // Crée une nouvelle instance si aucun code OTP n'existe
            verification.setEmail(email);
        }

        verification.setVerificationCode(code); // Associe le code OTP à l'utilisateur
        verificationRepository.save(verification); // Sauvegarde ou met à jour la vérification dans la base de données

        // Logique pour envoyer l'email (prend en charge l'envoi d'un email ici)
        emailService.sendVerificationEmail(email, code);
    }

    // Réinitialisation du mot de passe avec l'OTP
    public void resetPassword(String email, String otp, String newPassword) {
        // Recherche de la vérification pour cet email
        UserVerification verification = verificationRepository.findByEmail(email);
        if (verification == null || !verification.getVerificationCode().trim().equalsIgnoreCase(otp.trim())) {
            throw new RuntimeException("Code de vérification invalide");
        }

        // Recherche de l'utilisateur par email
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("Utilisateur non trouvé");
        }

        user.setPassword(passwordEncoder.encode(newPassword)); // Mise à jour du mot de passe crypté
        userRepository.save(user); // Sauvegarde de l'utilisateur avec le nouveau mot de passe

        verificationRepository.delete(verification); // Suppression de l'OTP après la réinitialisation réussie
    }




}
