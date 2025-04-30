package tn.arctic.nexus.entities;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String roomId;

    @OneToOne
    @JoinColumn(name = "ticket_id")
    private SupportTicket ticket; // Relation avec le SupportTicket

    private String lien;
    private LocalDateTime dateCreation;
    private LocalDateTime dernierMessage;
    private boolean active;
    @JsonIgnore
    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Message> messages;

    @ManyToOne
    @JoinColumn(name = "user_id") // Defines the foreign key for the user
    private User user;

}