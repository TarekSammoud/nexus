package tn.arctic.nexus.controllers.JamsModule;

import tn.arctic.nexus.entities.EntryMedia;
import tn.arctic.nexus.entities.EntryRating;
import tn.arctic.nexus.services.JamsModule.IEntryRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/entry-ratings")
public class EntryRatingController {

    @Autowired
    IEntryRatingService ratingService;

    @GetMapping("/all")
    public List<EntryRating> getAllRatings() {
        return ratingService.getAllRatings();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EntryRating> getRatingById(@PathVariable Long id) {
        Optional<EntryRating> rating = ratingService.getRatingById(id);
        return rating.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<EntryRating> createRating(@RequestBody EntryRating rating) {
        return ResponseEntity.ok(ratingService.createRating(rating));
    }
    @PutMapping("/update")
    public EntryRating updateMedia(@RequestBody EntryRating entryRating) {
        return ratingService.updateRating(entryRating);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteRating(@PathVariable Long id) {
        ratingService.deleteRating(id);
        return ResponseEntity.noContent().build();
    }
}
