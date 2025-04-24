package tn.arctic.nexus.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // Primary key for the message

    private String sendername;      // Name of the message sender
    private Long senderId;          // ID of the sender (User)
    private Long recipientId;       // ID of the recipient (User or agent)

    private String content;         // Actual message content

    @Enumerated(EnumType.STRING)
    private MessageType type;       // Message type: CHAT / JOIN / LEAVE / ERROR etc.

    private LocalDateTime timestamp = LocalDateTime.now(); // When message was sent

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;              // The private chat room this message belongs to

    @ManyToOne
    @JoinColumn(name = "ticket_id")
    private SupportTicket ticket;   // Optional: support ticket linked to the message

}
