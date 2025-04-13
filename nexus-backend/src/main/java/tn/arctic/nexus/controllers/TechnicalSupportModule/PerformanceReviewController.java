package tn.arctic.nexus.controllers.TechnicalSupportModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.PerformanceReview;
import tn.arctic.nexus.services.TechnicalSupportModule.PerformanceReviewService;

import java.util.List;
import java.util.Optional;
@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/performancereviews")
public class PerformanceReviewController {

    @Autowired
    private PerformanceReviewService performanceReviewService;

    @GetMapping("/getAll")
    public List<PerformanceReview> getAllReviews() {
        return performanceReviewService.getAllReviews();
    }

    @GetMapping("/agent/{agentId}")
    public List<PerformanceReview> getReviewsByAgentId(@PathVariable Long agentId) {
        return performanceReviewService.getReviewsByAgentId(agentId);
    }

    @PostMapping("/addReview")
    public ResponseEntity<PerformanceReview> addReview(@RequestBody PerformanceReview review) {
        PerformanceReview createdReview = performanceReviewService.addReview(review);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdReview);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PerformanceReview> updateReview(@PathVariable Long id, @RequestBody PerformanceReview reviewDetails) {
        Optional<PerformanceReview> existingReview = Optional.ofNullable(performanceReviewService.getReviewById(id));

        if (existingReview.isPresent()) {
            PerformanceReview updatedReview = existingReview.get();
            updatedReview.setSupportAgentId(reviewDetails.getSupportAgentId());
            updatedReview.setRating(reviewDetails.getRating());
            updatedReview.setFeedback(reviewDetails.getFeedback());
            performanceReviewService.addReview(updatedReview);
            return ResponseEntity.ok(updatedReview);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        Optional<PerformanceReview> review = Optional.ofNullable(performanceReviewService.getReviewById(id));
        if (review.isPresent()) {
            performanceReviewService.deleteReview(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
