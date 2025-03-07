package tn.arctic.nexus.services.TechnicalSupportModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.PerformanceReview;
import tn.arctic.nexus.repositories.TechnicalSupportModule.IPerformanceReviewRepository;

import java.util.List;

@Service
public class PerformanceReviewService {
    @Autowired
    private IPerformanceReviewRepository performanceReviewRepository;

    public List<PerformanceReview> getReviewsByAgentId(Long agentId) {
        return performanceReviewRepository.findBySupportAgentId(agentId);
    }

    public PerformanceReview addReview(PerformanceReview review) {
        return performanceReviewRepository.save(review);
    }
}
