package tn.arctic.nexus.repositories.Market;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.arctic.nexus.entities.Bid;

public interface BidRepository extends JpaRepository<Bid, Long> {}
