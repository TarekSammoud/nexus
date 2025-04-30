package tn.arctic.nexus.repositories.Market;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tn.arctic.nexus.entities.Bid;
import java.util.List;

public interface BidRepository extends JpaRepository<Bid, Long> {
    List<Bid> findByMarketListing_IdOrderByCreatedAtDesc(Long listingId);
    @Query("SELECT MAX(b.amount) FROM Bid b WHERE b.marketListing.id = :listingId")
    Double findHighestBidAmountByMarketListingId(@Param("listingId") Long listingId);

}
