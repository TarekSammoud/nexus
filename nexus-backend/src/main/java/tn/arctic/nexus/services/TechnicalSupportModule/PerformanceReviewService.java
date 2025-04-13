package tn.arctic.nexus.services.TechnicalSupportModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.PerformanceReview;
import tn.arctic.nexus.entities.SupportAgent;
import tn.arctic.nexus.repositories.TechnicalSupportModule.IPerformanceReviewRepository;
import tn.arctic.nexus.repositories.TechnicalSupportModule.ISupportAgentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class PerformanceReviewService {

    private static final Logger logger = LoggerFactory.getLogger(PerformanceReviewService.class);

    @Autowired
    private IPerformanceReviewRepository performanceReviewRepository;  // Autowired repository for PerformanceReview

    @Autowired
    private ISupportAgentRepository supportAgentRepository;  // Autowired repository for SupportAgent

    // Fetch all performance reviews by agent ID
    public List<PerformanceReview> getReviewsByAgentId(Long agentId) {
        List<PerformanceReview> reviews = performanceReviewRepository.findBySupportAgentId(agentId);
        if (reviews.isEmpty()) {
            logger.error("No reviews found for agent ID: {}", agentId);
            throw new NoSuchElementException("No reviews found for agent ID: " + agentId);
        }
        return reviews;
    }

    // Add a new performance review
    public PerformanceReview addReview(PerformanceReview review) {
        Optional<SupportAgent> agentOptional = supportAgentRepository.findById(review.getSupportAgentId());

        if (agentOptional.isPresent()) {
            SupportAgent agent = agentOptional.get();
            review.setAgent(agent);  // Set the agent for the review
            return performanceReviewRepository.save(review);  // Save the review
        } else {
            throw new RuntimeException("Support Agent not found with ID: " + review.getSupportAgentId());
        }
    }

    // Fetch a specific performance review by its ID
    public PerformanceReview getReviewById(Long reviewId) {
        return performanceReviewRepository.findById(reviewId)
                .orElseThrow(() -> {
                    logger.error("Review not found with ID: {}", reviewId);
                    return new NoSuchElementException("Review not found with ID: " + reviewId);
                });
    }

    // Fetch all performance reviews
    public List<PerformanceReview> getAllReviews() {
        return performanceReviewRepository.findAll();
    }

    // Delete a performance review by ID
    public void deleteReview(Long id) {
        performanceReviewRepository.deleteById(id);
    }
}
