package tn.arctic.nexus.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serializable;
import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class GameItem implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    @Enumerated(EnumType.STRING)
    private Rarity rarity; // Enum to represent the rarity of the game item (common, rare, epic, etc.)

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt; // Auto-generated timestamp when created

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt; // Auto-updated timestamp when modified

    public Long getId() {
        return id;
    }
}
