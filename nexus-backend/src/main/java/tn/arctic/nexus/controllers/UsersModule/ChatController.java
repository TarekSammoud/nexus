package tn.arctic.nexus.controllers.UsersModule;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import tn.arctic.nexus.entities.ChatMessage;

@Controller
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;

    public ChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    // Gérer l'envoi de messages via STOMP
    @MessageMapping("/chat.sendMessage")
    public void sendMessage(@Payload ChatMessage message) {
        System.out.println("Message envoyé : " + message.getSenderId() + " -> " + message.getRecipientId());

        // Vérification que le message contient des valeurs valides
        if (message.getRecipientId() == null || message.getSenderId() == null) {
            System.err.println("Message invalide, destinataire ou expéditeur manquant.");
            return;
        }

        // Envoi au destinataire
        try {
            messagingTemplate.convertAndSendToUser(
                    message.getRecipientId().toString(), // Utilise l'ID comme nom d'utilisateur
                    "/queue/messages",  // Le canal auquel l'utilisateur est abonné
                    message  // Le message à envoyer
            );
            System.out.println("Message envoyé à l'utilisateur " + message.getRecipientId());
        } catch (Exception e) {
            System.err.println("Erreur lors de l'envoi du message à " + message.getRecipientId() + ": " + e.getMessage());
        }
    }
}
