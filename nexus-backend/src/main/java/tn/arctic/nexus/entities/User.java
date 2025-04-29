package tn.arctic.nexus.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Inheritance(strategy = InheritanceType.JOINED)
public class User implements Serializable {
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "developer")
    @JsonIgnore
    private List<Game> developedGames;

    @Getter
    private String firstName;
    @Getter
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



    @Enumerated(EnumType.STRING)
    private RoleType roleType;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private ProfilePictures profilePicture;

    @ManyToMany
    private List<Game> gameLibrary;


    @OneToOne(mappedBy = "user")
    private Wallet wallet;


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Publication> publications = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Like> likes = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Commentaire> commentaires = new ArrayList<>();

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"user", "transfers", "payments", "purchase"})
    private Wallet wallet2;


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<GameKey> gamekeyLibrary;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("user-entryrating")
    private Set<EntryRating> ratings;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("reviews-user")
    private List<GameReview> gameReviews;


    @ManyToOne
    @JoinColumn(name = "room_id", referencedColumnName = "id")
    private Room room;

    public String getFirstName() {
        return firstName;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Date getLast_login() {
        return last_login;
    }

    public void setLast_login(Date last_login) {
        this.last_login = last_login;
    }

    public RoleType getRoleType() {
        return roleType;
    }

    public void setRoleType(RoleType roleType) {
        this.roleType = roleType;
    }

    public ProfilePictures getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(ProfilePictures profilePicture) {
        this.profilePicture = profilePicture;
    }

    public List<Game> getGameLibrary() {
        return gameLibrary;
    }

    public void setGameLibrary(List<Game> gameLibrary) {
        this.gameLibrary = gameLibrary;
    }

    public List<Publication> getPublications() {
        return publications;
    }

    public void setPublications(List<Publication> publications) {
        this.publications = publications;
    }

    public List<Like> getLikes() {
        return likes;
    }

    public void setLikes(List<Like> likes) {
        this.likes = likes;
    }

    public List<Commentaire> getCommentaires() {
        return commentaires;
    }


    public void setCommentaires(List<Commentaire> commentaires) {
        this.commentaires = commentaires;
    }
    public List<GameKey> getGamekeyLibrary() {
        return gamekeyLibrary;
    }

    public void setGamekeyLibrary(List<GameKey> gamekeyLibrary) {
        this.gamekeyLibrary = gamekeyLibrary;
    }

    public List<GameReview> getGameReviews() {
        return gameReviews;
    }

    public void setGameReviews(List<GameReview> gameReviews) {
        this.gameReviews = gameReviews;
    }

    public Wallet getWallet() {
        return wallet;
    }

    public void setWallet(Wallet wallet) {
        this.wallet = wallet;
    }


    // Getters and setters for all properties...
}
