package tn.arctic.nexus.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)  // Ensures separate tables for User and Player
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Player extends User {

}
