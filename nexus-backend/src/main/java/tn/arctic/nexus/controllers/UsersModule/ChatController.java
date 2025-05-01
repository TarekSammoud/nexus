package tn.arctic.nexus.controllers.UsersModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import tn.arctic.nexus.entities.ChatMessage;
import tn.arctic.nexus.entities.MessageType;
import tn.arctic.nexus.entities.User;
import tn.arctic.nexus.repositories.UsersModule.IUserRepository;

import java.time.LocalDateTime;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://nexus-frontend.frontend.svc.cluster.local:4200")

public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;


    public ChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;

    }

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        chatMessage.setTimestamp(LocalDateTime.now());
        System.out.println("Message envoyé par: " + chatMessage.getSendername());
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
        userRepository.findById(chatMessage.getSenderId()).ifPresent(user -> {
            headerAccessor.getSessionAttributes().put("username", user.getFirstName());
            chatMessage.setSendername(user.getFirstName());
            chatMessage.setType(MessageType.JOIN);
        });

        return chatMessage;
    }


}

