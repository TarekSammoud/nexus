package tn.arctic.nexus.services.MarketService;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tn.arctic.nexus.entities.Bid;
import tn.arctic.nexus.entities.GameItem;
import tn.arctic.nexus.entities.MarketListing;
import tn.arctic.nexus.entities.User;
import tn.arctic.nexus.repositories.GameItemRepository;
import tn.arctic.nexus.repositories.Market.BidRepository;
import tn.arctic.nexus.repositories.Market.MarketListingRepository;
import tn.arctic.nexus.repositories.UsersModule.IUserRepository;
import tn.arctic.nexus.services.MarketEmailService;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class MarketListingService {

    private final MarketListingRepository repository;
    private final GameItemRepository gameItemRepository;
    private final IUserRepository userRepository;
    private final MarketEmailService emailService;
    private final BidRepository bidRepository;

    public MarketListingService(MarketListingRepository repository,
                                GameItemRepository gameItemRepository,
                                IUserRepository userRepository,
                                MarketEmailService emailService,
                                BidRepository bidRepository) {
        this.repository = repository;
        this.gameItemRepository = gameItemRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.bidRepository = bidRepository;
    }

    public List<MarketListing> findAll() {
        return repository.findAll();
    }

    public Optional<MarketListing> findById(Long id) {
        return repository.findById(id);
    }

    public MarketListing save(MarketListing marketListing) {
        if (marketListing.getItem() != null) {
            GameItem item = gameItemRepository.findById(marketListing.getItem().getId())
                    .orElseThrow(() -> new RuntimeException("GameItem not found with ID: " + marketListing.getItem().getId()));
            marketListing.setItem(item);
        }

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

    // ✅ Scheduler pour traiter les enchères expirées toutes les 1 minute
    @Scheduled(fixedRate = 60000)
    @Transactional
    public void processExpiredListings() {
        List<MarketListing> expiredListings = repository.findAllExpiredListingsWithBids(LocalDateTime.now());

        for (MarketListing listing : expiredListings) {
            List<Bid> bids = listing.getBids();
            if (bids != null && !bids.isEmpty()) {
                Bid highestBid = bids.stream()
                        .max(Comparator.comparing(Bid::getAmount))
                        .orElse(null);

                if (highestBid != null) {
                    emailService.sendWinnerEmail(highestBid.getUser(), listing.getItem().getName());
                }
            }

            repository.delete(listing);
            //System.out.println("✅ MarketListing " + listing.getId() + " supprimé après fin de l'enchère.");
        }
    }
}
