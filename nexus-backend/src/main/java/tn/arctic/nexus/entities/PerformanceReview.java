package tn.arctic.nexus.entities;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PerformanceReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId; // User giving the review

    @ManyToOne
    private SupportAgent supportAgent;

    private int rating;
    private String feedback;
}
