package tn.arctic.nexus.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;


    @Entity
    @Data
    @AllArgsConstructor
    @NoArgsConstructor

    public class Bid {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @ManyToOne
        @JoinColumn(name = "user_id", nullable = false)
        private User user;

        private Double amount;
        private LocalDateTime createdAt;

        @JsonProperty("isWinningBid")
        private Boolean isWinningBid;

        @ManyToOne
        @JoinColumn(name = "market_listing_id", referencedColumnName = "id", nullable = false)
        @JsonIgnore
        private MarketListing marketListing;

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public User getUser() {
            return user;
        }

        public void setUser(User user) {
            this.user = user;
        }

        public Double getAmount() {
            return amount;
        }

        public void setAmount(Double amount) {
            this.amount = amount;
        }

        public LocalDateTime getCreatedAt() {
            return createdAt;
        }

        public void setCreatedAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
        }

        public Boolean getWinningBid() {
            return isWinningBid;
        }

        public void setWinningBid(Boolean winningBid) {
            isWinningBid = winningBid;
        }

        public MarketListing getMarketListing() {
            return marketListing;
        }

        public void setMarketListing(MarketListing marketListing) {
            this.marketListing = marketListing;
        }
    }


