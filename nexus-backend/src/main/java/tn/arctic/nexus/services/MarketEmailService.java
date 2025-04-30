package tn.arctic.nexus.services;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.User;

@Service
public class MarketEmailService {

    private final JavaMailSender mailSender;

    public MarketEmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendWinnerEmail(User user, String itemName) {
        if (user.getEmail() == null || user.getEmail().isEmpty()) {
            return; // éviter d’envoyer si pas d’email
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("🎉 Félicitations ! Vous avez remporté une enchère !");
        message.setText("Bonjour " + user.getFirstName() + ",\n\n" +
                "Vous avez remporté l'enchère pour l'item : " + itemName + " !\n\n" +
                "Merci d'avoir participé sur Arctic Nexus Marketplace.");

        mailSender.send(message);
    }
}
