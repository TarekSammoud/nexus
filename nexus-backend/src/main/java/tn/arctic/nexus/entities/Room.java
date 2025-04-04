package tn.arctic.nexus.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @JsonBackReference
    @OneToOne
    @JoinColumn(name = "ticket_id")
    private SupportTicket ticket; // Relation avec le SupportTicket

    private String lien;
    private LocalDateTime dateCreation;
    private LocalDateTime dernierMessage;
    private boolean active;
}

