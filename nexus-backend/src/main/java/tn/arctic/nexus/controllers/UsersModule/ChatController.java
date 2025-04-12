package tn.arctic.nexus.controllers.UsersModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;
import tn.arctic.nexus.entities.ChatMessage;
import tn.arctic.nexus.entities.User;
import tn.arctic.nexus.repositories.UsersModule.IUserRepository;

import java.util.Optional;

@RestController
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;


    public ChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;

    }

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        if (chatMessage.getSenderId() == null || chatMessage.getRecipientId() == null) {
            System.err.println("Message invalide, destinataire ou expéditeur manquant.");
        }

        try {

            // Envoyer le message à l'utilisateur via WebSocket
//            messagingTemplate.convertAndSendToUser(
//                    chatMessage.getRecipientId().toString(),
//                    "/queue/messages",
//                    chatMessage
//            );
            System.out.println("Message envoyé à l'utilisateur " + chatMessage.getRecipientId());
            return chatMessage;
        } catch (Exception e) {
            System.err.println("Erreur lors de l'envoi du message: " + e.getMessage());
            e.printStackTrace();

        }
        return chatMessage;
    }
@Autowired
    private IUserRepository userRepository;

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public ChatMessage addUser(
            @Payload ChatMessage chatMessage,
            SimpMessageHeaderAccessor headerAccessor
    ) {

        Optional<User> user = Optional.of(new User());
        user= userRepository.findById(chatMessage.getSenderId());

        headerAccessor.getSessionAttributes().put("username",user.get().getFirstName());
        return chatMessage;
    }

}

/*
*
*  @GetMapping("/getMessages")
    public List<ChatMessage> getMessages(@RequestParam Long userId) {
        // Récupérer tous les messages envoyés ou reçus par l'utilisateur
        return chatMessageRepository.findBySenderIdAndRecipientIdOrderByTimestampAsc(userId, userId);
    }*/