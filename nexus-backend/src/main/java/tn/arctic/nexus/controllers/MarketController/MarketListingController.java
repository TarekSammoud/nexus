package tn.arctic.nexus.controllers.MarketController;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.Bid;
import tn.arctic.nexus.entities.MarketListing;
import tn.arctic.nexus.repositories.Market.BidRepository;
import tn.arctic.nexus.services.MarketService.MarketListingService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/marketlistings")
@CrossOrigin(origins = "http://nexus-frontend.frontend.svc.cluster.local:4200") // Add CORS if needed
public class MarketListingController {

    private final MarketListingService service;
    private final BidRepository bidRepository;

    public MarketListingController(MarketListingService service, BidRepository bidRepository) {
        this.service = service;
        this.bidRepository = bidRepository;
    }

    // 🔍 Get all market listings
    @GetMapping
    public List<MarketListing> getAll() {
        return service.findAll();
    }

    // 🔍 Get market listing by ID
    @GetMapping("/{id}")
    public ResponseEntity<MarketListing> getById(@PathVariable Long id) {
        Optional<MarketListing> listing = service.findById(id);
        return listing.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ Create new market listing
    @PostMapping
    public ResponseEntity<?> create(@RequestBody MarketListing marketListing) {
        try {
            MarketListing savedListing = service.save(marketListing);
            return ResponseEntity.ok(savedListing);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error creating MarketListing: " + e.getMessage());
        }
    }

    // ✏️ Update existing market listing
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody MarketListing marketListing) {
        try {
            MarketListing updatedListing = service.update(id, marketListing);
            return ResponseEntity.ok(updatedListing);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error updating MarketListing: " + e.getMessage());
        }
    }

    // ❌ Delete a market listing
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    // 📥 Get all bids for a specific market listing
    @GetMapping("/{id}/bids")
    public List<Bid> getBidsForListing(@PathVariable Long id) {
        return bidRepository.findByMarketListing_IdOrderByCreatedAtDesc(id);
    }
}
