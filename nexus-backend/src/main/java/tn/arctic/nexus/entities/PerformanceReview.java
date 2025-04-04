package tn.arctic.nexus.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PerformanceReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long supportAgentId;

    @ManyToOne
    @JoinColumn(name = "agent_id")
    private SupportAgent agent;  // The 'agent' field here should be used in the service

    private int rating;
    private String feedback;
}
