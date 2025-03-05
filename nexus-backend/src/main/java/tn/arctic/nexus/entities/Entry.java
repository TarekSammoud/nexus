package tn.arctic.nexus.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
public class Entry implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nameEntry;
    private String descriptionEntry;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "jam_id", nullable = false)
    @JsonBackReference
    private Jam jam;

    @OneToMany(mappedBy = "entry", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Set<EntryMedia> entryMediaList;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameEntry() {
        return nameEntry;
    }

    public void setNameEntry(String nameEntry) {
        this.nameEntry = nameEntry;
    }

    public String getDescriptionEntry() {
        return descriptionEntry;
    }

    public void setDescriptionEntry(String descriptionEntry) {
        this.descriptionEntry = descriptionEntry;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Jam getJam() {
        return jam;
    }

    public void setJam(Jam jam) {
        this.jam = jam;
    }

    public Set<EntryMedia> getEntryMediaList() {
        return entryMediaList;
    }

    public void setEntryMediaList(Set<EntryMedia> entryMediaList) {
        this.entryMediaList = entryMediaList;
    }
}