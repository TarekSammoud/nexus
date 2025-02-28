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
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Game implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    @Enumerated(EnumType.STRING)
    private GamePlatform platform;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    @ManyToMany
    @JoinTable(
            name = "game_game_item", // The join table that connects Game and GameItem
            joinColumns = @JoinColumn(name = "game_id"), // Foreign key referencing Game
            inverseJoinColumns = @JoinColumn(name = "game_item_id") // Foreign key referencing GameItem
    )
    private List<GameItem> gameItems;

    @ManyToMany
    private List<User> users;

    @ManyToMany
    private List<GameCategory> categories;

}
