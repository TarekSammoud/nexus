package tn.arctic.nexus.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import tn.arctic.nexus.entities.Departement;
import tn.arctic.nexus.entities.PerformanceReview;
import tn.arctic.nexus.entities.SupportTicket;

import java.util.List;
import java.util.Set;

@Setter
@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class SupportAgent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String name;
    private String email;

    @Enumerated(EnumType.STRING)
    private Departement departement;

    @OneToMany(mappedBy = "assigneA")
    private List<SupportTicket> ticketsAssignes;

    @OneToMany(mappedBy = "agent")
    @JsonIgnore  // 🔥 Prevents infinite recursion
    private Set<PerformanceReview> evaluations;
}
