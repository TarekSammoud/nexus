package tn.arctic.nexus.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BlockList implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idBlockList;

    @ManyToOne
    @JoinColumn(name = "blocked_id", nullable = false)
    private User blockedUser;

    @Temporal(TemporalType.DATE)
    private Date blockedAt;  // Date de début du blocage

    @Temporal(TemporalType.DATE)
    private Date blockedUntil;  // Date de fin du blocage (nouveau champ)

    private String reason;  // Raison du blocage
}
