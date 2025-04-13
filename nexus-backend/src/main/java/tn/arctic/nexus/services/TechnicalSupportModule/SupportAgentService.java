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

    // Get agents by department
    public List<SupportAgent> getAgentsByDepartement(Departement departement) {
        return supportAgentRepository.findByDepartement(departement);
    }

    // Get agent by ID
    public Optional<SupportAgent> getAgentById(Long id) {
        return supportAgentRepository.findById(id);
    }

    // Create a new agent
    public SupportAgent createAgent(SupportAgent agent) {
        return supportAgentRepository.save(agent);
    }

    // Update an existing agent
    public Optional<SupportAgent> updateAgent(Long id, SupportAgent agent) {
        if (supportAgentRepository.existsById(id)) {
            agent.setId(id);
            return Optional.of(supportAgentRepository.save(agent));
        }
        return Optional.empty();
    }

    // Delete agent by ID
    public boolean deleteAgent(Long id) {
        if (supportAgentRepository.existsById(id)) {
            supportAgentRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
