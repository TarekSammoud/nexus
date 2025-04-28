package tn.arctic.nexus.repositories.Market;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tn.arctic.nexus.entities.MarketListing;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface MarketListingRepository extends JpaRepository<MarketListing, Long> {
    Optional<MarketListing> findById(Long id);
    @Query("SELECT ml FROM MarketListing ml LEFT JOIN FETCH ml.bids WHERE ml.endDate < :now")
    List<MarketListing> findAllExpiredListingsWithBids(@Param("now") LocalDateTime now);

}


