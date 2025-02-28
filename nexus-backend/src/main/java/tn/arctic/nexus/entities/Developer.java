package tn.arctic.nexus.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Developer extends User {
    @ManyToMany
    private List<Game> developedGames;

    @ManyToMany
    private List<GameItem> developedItems;
}
