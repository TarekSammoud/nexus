package tn.arctic.nexus.entities;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ChatMessage {
    private String senderId;
    private String recipientId;
    private String content;
    private Date timestamp;

    // Constructeur pour initialiser un message avec l'heure actuelle
    public ChatMessage(String senderId, String recipientId, String content) {
        this.senderId = senderId;
        this.recipientId = recipientId;
        this.content = content;
        this.timestamp = new Date();  // Ajouter la date du message
    }
}
