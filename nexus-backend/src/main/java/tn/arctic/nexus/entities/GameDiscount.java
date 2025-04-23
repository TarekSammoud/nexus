package tn.arctic.nexus.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class GameDiscount implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "game_id")
    @JsonBackReference("game-discount") // Manages the back reference to Game
    private Game game;

    // Discount percentage (e.g., 40 for 40% off)
    @Column(nullable = false)
    private int discountPercentage;

    // Start date of the sale
    @Temporal(TemporalType.TIMESTAMP)
    private Date saleStartDate;

    // End date of the sale
    @Temporal(TemporalType.TIMESTAMP)
    private Date saleEndDate;

    // Flag to check if the sale is currently active
    @Column(nullable = false)
    private boolean isActive;

    // Constructor, Getters, Setters, etc.


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public int getDiscountPercentage() {
        return discountPercentage;
    }

    public void setDiscountPercentage(int discountPercentage) {
        this.discountPercentage = discountPercentage;
    }

    public Date getSaleStartDate() {
        return saleStartDate;
    }

    public void setSaleStartDate(Date saleStartDate) {
        this.saleStartDate = saleStartDate;
    }

    public Date getSaleEndDate() {
        return saleEndDate;
    }

    public void setSaleEndDate(Date saleEndDate) {
        this.saleEndDate = saleEndDate;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public BigDecimal calculateDiscountedPrice() {
        if (game != null && game.getPrice() != null) {
            BigDecimal discount = game.getPrice().multiply(new BigDecimal(discountPercentage)).divide(new BigDecimal(100));
            return game.getPrice().subtract(discount);
        }
        return BigDecimal.ZERO;
    }
}
