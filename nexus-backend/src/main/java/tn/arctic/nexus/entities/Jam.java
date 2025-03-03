package tn.arctic.nexus.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Jam implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime devStartDate;
    private LocalDateTime devEndDate;
    private LocalDateTime voteStartDate;
    private LocalDateTime voteEndDate;

    private String reward;


    @OneToMany(cascade = CascadeType.ALL)
    private Set<Entry> entrys;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}