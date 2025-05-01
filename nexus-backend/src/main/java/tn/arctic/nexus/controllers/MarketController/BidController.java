package tn.arctic.nexus.controllers.MarketController;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.Bid;
import tn.arctic.nexus.services.MarketService.BidService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/bids")  // <- important
@CrossOrigin(origins = "http://nexus-frontend.frontend.svc.cluster.local:4200")  // allow frontend access
public class BidController {
    private final BidService service;

    public BidController(BidService service) {
        this.service = service;
    }

    @GetMapping
    public List<Bid> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bid> getById(@PathVariable Long id) {
        Optional<Bid> bid = service.findById(id);
        return bid.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    @GetMapping("/marketlistings/{listingId}/bids")
    public List<Bid> getBidsForListing(@PathVariable Long listingId) {
        return service.findByMarketListingId(listingId);
    }

    @PostMapping
    public Bid create(@RequestBody Bid bid) {
        return service.save(bid);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Bid> update(@PathVariable Long id, @RequestBody Bid bid) {
        try {
            return ResponseEntity.ok(service.update(id, bid));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/marketlistings/{listingId}/bids/highest")
    public ResponseEntity<Double> getHighestBidAmount(@PathVariable Long listingId) {
        Double highest = service.getHighestBidAmount(listingId);
        return ResponseEntity.ok(highest != null ? highest : 0.0); // fallback if no bids
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/market/{marketId}")
    public ResponseEntity<List<Bid>> getBidsForMarket(@PathVariable Long marketId) {
        List<Bid> bids = service.findByMarketListingId(marketId);
        return ResponseEntity.ok(bids);
    }

}
