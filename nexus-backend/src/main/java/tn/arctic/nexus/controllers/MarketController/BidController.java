package tn.arctic.nexus.controllers.MarketController;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.Bid;
import tn.arctic.nexus.services.MarketService.BidService;

import java.util.List;
import java.util.Optional;

@RestController
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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
