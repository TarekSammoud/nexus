package tn.arctic.nexus.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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
@NoArgsConstructor
@Getter
@Setter
@Inheritance(strategy = InheritanceType.JOINED)
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



    @Enumerated(EnumType.STRING)
    private RoleType roleType;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private ProfilePictures profilePicture;

    @ManyToMany
    private List<Game> gameLibrary;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<GameKey> gamekeyLibrary;

    /*@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("user-entryrating")
    private Set<EntryRating> ratings;*/

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("reviews-user")
    private List<GameReview> gameReviews;
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
}
