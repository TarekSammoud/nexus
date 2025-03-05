package tn.arctic.nexus.repositories.Market;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.arctic.nexus.entities.MarketListing;

import java.util.Optional;

public interface MarketListingRepository extends JpaRepository<MarketListing, Long> {
    Optional<MarketListing> findById(Long id);

}


