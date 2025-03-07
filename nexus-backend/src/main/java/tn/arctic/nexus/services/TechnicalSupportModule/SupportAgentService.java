package tn.arctic.nexus.services.TechnicalSupportModule;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.SupportAgent;
import tn.arctic.nexus.repositories.TechnicalSupportModule.ISupportAgentRepository;

import java.util.List;
import java.util.Optional;

@Service
public class SupportAgentService {
    @Autowired
    private ISupportAgentRepository supportAgentRepository;

    public List<SupportAgent> getAllAgents() {
        return supportAgentRepository.findAll();
    }

    public SupportAgent createAgent(SupportAgent agent) {
        return supportAgentRepository.save(agent);
    }

    public Optional<SupportAgent> getAgentById(Long id) {
        return supportAgentRepository.findById(id);
    }

    public void deleteAgent(Long id) {
        supportAgentRepository.deleteById(id);
    }
}