package tn.arctic.nexus.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "like_table")
public class Like
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "publication_id", nullable = false)
    private Publication publication;

}
