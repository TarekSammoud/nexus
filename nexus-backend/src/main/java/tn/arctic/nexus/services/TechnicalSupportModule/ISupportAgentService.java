package tn.arctic.nexus.services.TechnicalSupportModule;

import tn.arctic.nexus.entities.SupportAgent;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface ISupportAgentService {
    List<SupportAgent> getAllAgents();
    SupportAgent createAgent(SupportAgent agent);
    Optional<SupportAgent> getAgentById(Long id);
    void deleteAgent(Long id);
    public Map<SupportAgent, Double> getAgentsRankedByAverageRating();
}
