
package tn.arctic.nexus.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TicketMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long senderId; // User ID or Agent ID
    private String message;

    @ManyToOne
    private SupportTicket supportTicket;
}
