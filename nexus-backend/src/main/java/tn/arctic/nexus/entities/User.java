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
@NoArgsConstructor  // Lombok génère déjà le constructeur sans paramètre
@Getter
@Setter
@Inheritance(strategy = InheritanceType.JOINED)  // Stratégie d'héritage

public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phoneNumber;
    private String address;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = true)
    private Date updatedAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = true)
    private Date last_login;

    @ManyToMany
    private List<User> friends;

    @ManyToOne
    @JoinColumn( nullable = true)
    private Role role;

    @OneToMany
    @JoinColumn( nullable = true)
    private List<ProfilePictures> profilesPictures;

    @ManyToMany
    private List<Game> gameLibrary;
}