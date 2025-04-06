package tn.arctic.nexus.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import tn.arctic.nexus.entities.FinanceModule.Wallet;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Inheritance(strategy = InheritanceType.JOINED)  // Set the inheritance strategy here

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
    private Date updatedAt;

    @Temporal(TemporalType.TIMESTAMP)
    private Date last_login;

    @ManyToMany
    private List<User> friends;

    @ManyToOne
    private Role role;

    @OneToMany
    private List<ProfilePictures> profilesPictures;

    @OneToMany
    @JsonManagedReference
    private List<Game> gameLibrary;

    @OneToOne(mappedBy = "user")
    @JsonManagedReference("wallet-user")
    private Wallet wallet;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<GameKey> gamekeyLibrary;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("reviews-user")
    private List<GameReview> gameReviews;

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", address='" + address + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", last_login=" + last_login +
                ", friends=" + friends +
                ", role=" + role +
                ", profilesPictures=" + profilesPictures +
                ", gameLibrary=" + gameLibrary +
                ", wallet=" + wallet +
                ", gamekeyLibrary=" + gamekeyLibrary +
                ", gameReviews=" + gameReviews +
                '}';
    }

    // Getters and setters for all properties...
}
