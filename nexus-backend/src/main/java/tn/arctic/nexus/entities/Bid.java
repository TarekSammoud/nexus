package tn.arctic.nexus.entities;

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
        private Boolean isWinningBid;

        @ManyToOne
        @JoinColumn(name = "market_listing_id", referencedColumnName = "id", nullable = false)
        private MarketListing marketListing;

    }


