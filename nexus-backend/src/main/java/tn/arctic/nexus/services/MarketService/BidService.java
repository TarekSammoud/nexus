package tn.arctic.nexus.services.MarketService;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.Bid;
import tn.arctic.nexus.repositories.Market.BidRepository;

import java.util.List;
import java.util.Optional;
@Service
public class BidService {
    private final BidRepository repository;

    public BidService(BidRepository repository) {
        this.repository = repository;
    }

    public List<Bid> findAll() {
        return repository.findAll();
    }

    public Optional<Bid> findById(Long id) {
        return repository.findById(id);
    }

    public Bid save(Bid bid) {
        return repository.save(bid);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}

