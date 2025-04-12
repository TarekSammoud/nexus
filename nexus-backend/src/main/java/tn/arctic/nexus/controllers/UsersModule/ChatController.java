package tn.arctic.nexus.controllers.UsersModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;
import tn.arctic.nexus.entities.ChatMessage;
import tn.arctic.nexus.entities.MessageType;
import tn.arctic.nexus.entities.User;
import tn.arctic.nexus.repositories.UsersModule.IUserRepository;

import java.time.LocalDateTime;
import java.util.Optional;


@RestController
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;


    public ChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;

    }

    @MessageMapping("/chat.sendMessage")
    public void sendMessage(@Payload ChatMessage chatMessage) {
        try {
            // Envoyer le message au destinataire
            messagingTemplate.convertAndSendToUser(
                    chatMessage.getRecipientId().toString(),
                    "/queue/messages",
                    chatMessage
            );

            // Éventuellement aussi à l’expéditeur (pour affichage immédiat)
            messagingTemplate.convertAndSendToUser(
                    chatMessage.getSenderId().toString(),
                    "/queue/messages",
                    chatMessage
            );
            System.out.println("Reçu sur /chat.sendMessage: " +
                    "from=" + chatMessage.getSenderId() +
                    " to=" + chatMessage.getRecipientId() +
                    " content=" + chatMessage.getContent());



        } catch (Exception e) {
            System.err.println("Erreur lors de l'envoi du message: " + e.getMessage());
        }
    }


    @Autowired
    private IUserRepository userRepository;

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public ChatMessage addUser(
            @Payload ChatMessage chatMessage,
            SimpMessageHeaderAccessor headerAccessor
    ) {
        userRepository.findById(chatMessage.getSenderId()).ifPresent(user -> {
            headerAccessor.getSessionAttributes().put("username", user.getFirstName());
            chatMessage.setSendername(user.getFirstName());
            chatMessage.setType(MessageType.JOIN);
        });

        return chatMessage;
    }


}

