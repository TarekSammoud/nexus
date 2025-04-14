package tn.arctic.nexus.services.TechnicalSupportModule;

import tn.arctic.nexus.entities.PerformanceReview;

import java.util.List;

public interface IPerformanceReviewService {
    List<PerformanceReview> getReviewsByAgentId(Long agentId);
    PerformanceReview addReview(PerformanceReview review);

}
