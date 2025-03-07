package tn.arctic.nexus.repositories.TechnicalSupportModule;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.arctic.nexus.entities.PerformanceReview;

import java.util.List;

public interface IPerformanceReviewRepository extends JpaRepository<PerformanceReview, Long> {
    // Custom query method to fetch reviews by agent ID
    List<PerformanceReview> findBySupportAgentId(Long agentId);
}