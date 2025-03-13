package tn.arctic.nexus.entities;


import jakarta.persistence.*;

@Entity
@Table(name = "report")
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "thread_id", nullable = false) // thread_id = publication_id
    private Publication publication;

    @Column(nullable = false)
    private String reason;

    @Column(nullable = false)
    private String status;
}
