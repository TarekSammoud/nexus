package tn.arctic.nexus.services.TechnicalSupportModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.SupportAgent;
import tn.arctic.nexus.entities.Departement;
import tn.arctic.nexus.repositories.TechnicalSupportModule.ISupportAgentRepository;

import java.util.List;
import java.util.Optional;

@Service
public class SupportAgentService {

    @Autowired
    private ISupportAgentRepository supportAgentRepository;

    // Get all support agents
    public List<SupportAgent> getAllAgents() {
        return supportAgentRepository.findAll();
    }

    // Create or update a support agent
    public SupportAgent createOrUpdateAgent(SupportAgent agent) {
        return supportAgentRepository.save(agent);
    }

    // Get agent by ID
    public Optional<SupportAgent> getAgentById(Long id) {
        return supportAgentRepository.findById(id);
    }

    // Get agents by department
    public List<SupportAgent> getAgentsByDepartement(Departement departement) {
        return supportAgentRepository.findByDepartement(departement);
    }

    // Delete agent by ID
    public boolean deleteAgent(Long id) {
        Optional<SupportAgent> agent = supportAgentRepository.findById(id);
        if (agent.isPresent()) {
            supportAgentRepository.deleteById(id);
            return true;
        }
        return false;
    }


}
