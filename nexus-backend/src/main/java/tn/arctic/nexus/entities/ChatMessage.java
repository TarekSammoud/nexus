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
}

