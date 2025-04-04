package tn.arctic.nexus.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SupportTicket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    private TicketStatus status;


    @Enumerated(EnumType.STRING)
    private TicketPriority priority;

    @Enumerated(EnumType.STRING)
    private TicketCategory category;

    @ManyToOne
    @JoinColumn(name = "assigneA_id") // Ensure the column name is correct
    private SupportAgent assigneA;


    @JsonManagedReference
    @OneToOne(mappedBy = "ticket")
    private Room room;// This is the field referred by mappedBy in SupportAgent
}
