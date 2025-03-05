package tn.arctic.nexus.controllers.MarketController;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.MarketListing;
import tn.arctic.nexus.services.MarketService.MarketListingService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/marketlistings")
public class MarketListingController {
    private final MarketListingService service;

    public MarketListingController(MarketListingService service) {
        this.service = service;
    }

    @GetMapping
    public List<MarketListing> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MarketListing> getById(@PathVariable Long id) {
        Optional<MarketListing> listing = service.findById(id);
        return listing.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody MarketListing marketListing) {
        try {
            MarketListing savedListing = service.save(marketListing);
            return ResponseEntity.ok(savedListing);
        } catch (Exception e) {
            e.printStackTrace();  // Log the error in the console
            return ResponseEntity.status(500).body("Error creating MarketListing: " + e.getMessage());
        }
    }

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
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
