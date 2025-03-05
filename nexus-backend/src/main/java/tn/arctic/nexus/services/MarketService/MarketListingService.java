package tn.arctic.nexus.services.MarketService;

import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.GameItem;
import tn.arctic.nexus.entities.MarketListing;
import tn.arctic.nexus.entities.User;
import tn.arctic.nexus.repositories.GameItemRepository;
import tn.arctic.nexus.repositories.Market.MarketListingRepository;
import tn.arctic.nexus.repositories.UsersModule.IUserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class MarketListingService {
    private final MarketListingRepository repository;
    private final GameItemRepository gameItemRepository;
    private final IUserRepository userRepository;

    public MarketListingService(MarketListingRepository repository, GameItemRepository gameItemRepository, IUserRepository userRepository) {
        this.repository = repository;
        this.gameItemRepository = gameItemRepository;
        this.userRepository = userRepository;
    }

    public List<MarketListing> findAll() {
        return repository.findAll();
    }

    public Optional<MarketListing> findById(Long id) {
        return repository.findById(id);
    }

    public MarketListing save(MarketListing marketListing) {
        // Ensure GameItem is fetched from DB
        if (marketListing.getItem() != null) {
            GameItem item = gameItemRepository.findById(marketListing.getItem().getId())
                    .orElseThrow(() -> new RuntimeException("GameItem not found with ID: " + marketListing.getItem().getId()));
            marketListing.setItem(item);
        }

        // Ensure User is fetched from DB
        if (marketListing.getUser() != null) {
            User user = userRepository.findById(marketListing.getUser().getId())
                    .orElseThrow(() -> new RuntimeException("User not found with ID: " + marketListing.getUser().getId()));
            marketListing.setUser(user);
        }

        return repository.save(marketListing);
    }
    public MarketListing update(Long id, MarketListing marketListing) {
        return repository.findById(id).map(existingListing -> {
            existingListing.setItem(marketListing.getItem());
            existingListing.setEndDate(marketListing.getEndDate());
            existingListing.setStartBid(marketListing.getStartBid());
            existingListing.setUser(marketListing.getUser());
            return repository.save(existingListing);
        }).orElseThrow(() -> new RuntimeException("MarketListing not found with ID: " + id));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}