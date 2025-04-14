package tn.arctic.nexus.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.jetbrains.annotations.NotNull;


import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessage {


    private Long id;
    private String sendername;
    private Long senderId;
    private Long recipientId;
    private String content;
    private MessageType type;
    private LocalDateTime timestamp = LocalDateTime.now();

}