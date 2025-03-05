package tn.arctic.nexus.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.io.Serializable;
import java.util.Date;
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

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    private Date devStartDate;
    private Date devEndDate;
    private Date voteStartDate;
    private Date voteEndDate;

    private String reward;

    @OneToMany(mappedBy = "jam", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Set<Entry> entries;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToMany
    @JoinTable(
            name = "jam_participants",
            joinColumns = @JoinColumn(name = "jam_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> participants;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public Date getDevStartDate() {
        return devStartDate;
    }

    public void setDevStartDate(Date devStartDate) {
        this.devStartDate = devStartDate;
    }

    public Date getDevEndDate() {
        return devEndDate;
    }

    public void setDevEndDate(Date devEndDate) {
        this.devEndDate = devEndDate;
    }

    public Date getVoteStartDate() {
        return voteStartDate;
    }

    public void setVoteStartDate(Date voteStartDate) {
        this.voteStartDate = voteStartDate;
    }

    public Date getVoteEndDate() {
        return voteEndDate;
    }

    public void setVoteEndDate(Date voteEndDate) {
        this.voteEndDate = voteEndDate;
    }

    public String getReward() {
        return reward;
    }

    public void setReward(String reward) {
        this.reward = reward;
    }

    public Set<Entry> getEntries() {
        return entries;
    }

    public void setEntries(Set<Entry> entries) {
        this.entries = entries;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<User> getParticipants() {
        return participants;
    }

    public void setParticipants(Set<User> participants) {
        this.participants = participants;
    }
}