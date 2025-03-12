package tn.arctic.nexus.services.MarketService;

import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.Bid;
import tn.arctic.nexus.entities.MarketListing;
import tn.arctic.nexus.entities.User;
import tn.arctic.nexus.repositories.Market.BidRepository;
import tn.arctic.nexus.repositories.Market.MarketListingRepository;
import tn.arctic.nexus.repositories.UsersModule.IUserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class BidService {
    private final BidRepository repository;
    private final IUserRepository userRepository;
    private final MarketListingRepository marketListingRepository;

    public BidService(BidRepository repository, IUserRepository userRepository, MarketListingRepository marketListingRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
        this.marketListingRepository = marketListingRepository;
    }

    public List<Bid> findAll() {
        return repository.findAll();
    }

    public Optional<Bid> findById(Long id) {
        return repository.findById(id);
    }

    public Bid save(Bid bid) {
        // Load references to ensure they are managed entities
        User user = userRepository.findById(bid.getUser().getId())
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + bid.getUser().getId()));

        MarketListing marketListing = marketListingRepository.findById(bid.getMarketListing().getId())
                .orElseThrow(() -> new IllegalArgumentException("MarketListing not found with ID: " + bid.getMarketListing().getId()));

        bid.setUser(user);
        bid.setMarketListing(marketListing);

        return repository.save(bid);
    }

    public Bid update(Long id, Bid updatedBid) {
        return repository.findById(id).map(existingBid -> {

            // Ensure references are loaded and valid
            if (updatedBid.getUser() != null) {
                User user = userRepository.findById(updatedBid.getUser().getId())
                        .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + updatedBid.getUser().getId()));
                existingBid.setUser(user);
            }

            if (updatedBid.getMarketListing() != null) {
                MarketListing marketListing = marketListingRepository.findById(updatedBid.getMarketListing().getId())
                        .orElseThrow(() -> new IllegalArgumentException("MarketListing not found with ID: " + updatedBid.getMarketListing().getId()));
                existingBid.setMarketListing(marketListing);
            }

            // Update other fields
            existingBid.setAmount(updatedBid.getAmount());
            existingBid.setCreatedAt(updatedBid.getCreatedAt());
            existingBid.setWinningBid(updatedBid.getWinningBid());

            return repository.save(existingBid);
        }).orElseThrow(() -> new IllegalArgumentException("Bid not found with ID: " + id));
    }


    public void delete(Long id) {
        repository.deleteById(id);
    }
}
