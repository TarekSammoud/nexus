package tn.arctic.nexus.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EntryRating implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int graphicsScore;
    private int gameplayScore;
    private int musicScore;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    @ManyToOne
    @JoinColumn(name = "entry_id")
    @JsonBackReference("entry-entryRating")
    private Entry entry;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference("user-entryrating")
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getGraphicsScore() {
        return graphicsScore;
    }

    public void setGraphicsScore(int graphicsScore) {
        this.graphicsScore = graphicsScore;
    }

    public int getGameplayScore() {
        return gameplayScore;
    }

    public void setGameplayScore(int gameplayScore) {
        this.gameplayScore = gameplayScore;
    }

    public int getMusicScore() {
        return musicScore;
    }

    public void setMusicScore(int musicScore) {
        this.musicScore = musicScore;
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

    public Entry getEntry() {
        return entry;
    }

    public void setEntry(Entry entry) {
        this.entry = entry;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
