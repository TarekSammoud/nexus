package tn.arctic.nexus.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.persistence.CascadeType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Game implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private GameType type;

    private String description;

    @ManyToOne
    private User developer;

    private BigDecimal price;

    @Enumerated(EnumType.STRING)
    private List<GamePlatform> platforms;

    @OneToOne(mappedBy = "game", fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JsonManagedReference("game-discount") // Manages the back reference to GameDiscount
    private GameDiscount gameDiscount;

    public List<GameKey> getGameKeys() {
        return gameKeys;
    }

    public void setGameKeys(List<GameKey> gameKeys) {
        this.gameKeys = gameKeys;
    }

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL, orphanRemoval = true)
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    @JsonIgnore
    private List<GameKey> gameKeys;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    @OneToOne(cascade = CascadeType.ALL)
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    @JoinColumn(name = "min_requirements_id")
    private SystemRequirements minRequirements;

    @OneToOne(cascade = CascadeType.ALL)
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    @JoinColumn(name = "recommended_requirements_id")
    private SystemRequirements recommendedRequirements;

    @ManyToMany
    private List<GameItem> gameItems;

    @ManyToMany
    @JsonBackReference  // This prevents serialization of the game field in GameMedia
    private List<User> user;

    @ManyToMany
    private List<GameCategory> categories;



    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL, orphanRemoval = true)
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    @JsonManagedReference("game-screenshots")
    private List<GameMedia> screenshots;

    @OneToOne(mappedBy = "gameCover", cascade = CascadeType.ALL, orphanRemoval = true)
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    @JsonManagedReference("game-cover")
    private GameMedia coverPicture;

    @OneToOne(mappedBy = "gameBanner", cascade = CascadeType.ALL, orphanRemoval = true)
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    @JsonManagedReference("game-banner")
    private GameMedia bannerPicture;

    @OneToOne(mappedBy = "gameFile", cascade = CascadeType.ALL, orphanRemoval = true)
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    @JsonManagedReference("game-file")
    private GameMedia gameFile;


    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL, orphanRemoval = true)
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private List<GameReview> gameReviewList;

    public String getExtraGameInfo() {
        return extraGameInfo;
    }

    public void setExtraGameInfo(String extraGameInfo) {
        this.extraGameInfo = extraGameInfo;
    }

    @Lob  // This annotation tells Hibernate to treat the field as a large object
    @Column(nullable = true)  // Optional: set to true to allow null values
    private String extraGameInfo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        Game game ;
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

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
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

    public List<GameItem> getGameItems() {
        return gameItems;
    }

    public void setGameItems(List<GameItem> gameItems) {
        this.gameItems = gameItems;
    }



    public List<GameCategory> getCategories() {
        return categories;
    }

    public void setCategories(List<GameCategory> categories) {
        this.categories = categories;
    }



    public List<GameReview> getGameReviewList() {
        return gameReviewList;
    }

    public void setGameReviewList(List<GameReview> gameReviewList) {
        this.gameReviewList = gameReviewList;
    }


    public List<GamePlatform> getPlatforms() {
        return platforms;
    }

    public void setPlatforms(List<GamePlatform> platforms) {
        this.platforms = platforms;
    }

    public SystemRequirements getMinRequirements() {
        return minRequirements;
    }

    public void setMinRequirements(SystemRequirements minRequirements) {
        this.minRequirements = minRequirements;
    }

    public SystemRequirements getRecommendedRequirements() {
        return recommendedRequirements;
    }

    public void setRecommendedRequirements(SystemRequirements recommendedRequirements) {
        this.recommendedRequirements = recommendedRequirements;
    }

    public GameType getType() {
        return type;
    }

    public void setType(GameType type) {
        this.type = type;
    }

    public List<GameMedia> getScreenshots() {
        return screenshots;
    }

    public void setScreenshots(List<GameMedia> screenshots) {
        this.screenshots = screenshots;
    }

    public GameMedia getCoverPicture() {
        return coverPicture;
    }

    public void setCoverPicture(GameMedia coverPicture) {
        this.coverPicture = coverPicture;
    }

    public GameMedia getBannerPicture() {
        return bannerPicture;
    }

    public void setBannerPicture(GameMedia bannerPicture) {
        this.bannerPicture = bannerPicture;
    }

    public GameMedia getGameFile() {
        return gameFile;
    }

    public void setGameFile(GameMedia gameFile) {
        this.gameFile = gameFile;
    }
}
