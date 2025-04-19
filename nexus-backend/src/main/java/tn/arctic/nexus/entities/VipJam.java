package tn.arctic.nexus.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VipJam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;

    @Column(name = "primary_color")
    private String primaryColor;

    @Column(name = "font")
    private String font;

    @Column(name = "banner_type")
    private String bannerType;

    private String devStartDate;
    private String devEndDate;

    private String voteStartDate;

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

    public String getPrimaryColor() {
        return primaryColor;
    }

    public void setPrimaryColor(String primaryColor) {
        this.primaryColor = primaryColor;
    }

    public String getFont() {
        return font;
    }

    public void setFont(String font) {
        this.font = font;
    }

    public String getBannerType() {
        return bannerType;
    }

    public void setBannerType(String bannerType) {
        this.bannerType = bannerType;
    }

    public String getDevStartDate() {
        return devStartDate;
    }

    public void setDevStartDate(String devStartDate) {
        this.devStartDate = devStartDate;
    }

    public String getDevEndDate() {
        return devEndDate;
    }

    public void setDevEndDate(String devEndDate) {
        this.devEndDate = devEndDate;
    }

    public String getVoteStartDate() {
        return voteStartDate;
    }

    public void setVoteStartDate(String voteStartDate) {
        this.voteStartDate = voteStartDate;
    }

    public String getVoteEndDate() {
        return voteEndDate;
    }

    public void setVoteEndDate(String voteEndDate) {
        this.voteEndDate = voteEndDate;
    }

    public String getReward() {
        return reward;
    }

    public void setReward(String reward) {
        this.reward = reward;
    }

    private String voteEndDate;

    private String reward;
}
