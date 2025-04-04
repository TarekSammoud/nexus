package tn.arctic.nexus.controllers.TechnicalSupportModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.SupportAgent;
import tn.arctic.nexus.entities.Departement;
import tn.arctic.nexus.services.TechnicalSupportModule.SupportAgentService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("agents")
public class SupportAgentController {

    @Autowired
    private SupportAgentService supportAgentService;

    // Get all agents
    @GetMapping("getAll")
    public List<SupportAgent> getAllAgents() {
        return supportAgentService.getAllAgents();
    }

    // Get agent by ID
    @GetMapping("/{id}")
    public ResponseEntity<SupportAgent> getAgentById(@PathVariable Long id) {
        Optional<SupportAgent> agent = supportAgentService.getAgentById(id);
        return agent.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Create or update a support agent
    @PostMapping("createagent")
    public ResponseEntity<SupportAgent> createOrUpdateAgent(@RequestBody SupportAgent agent) {
        SupportAgent savedAgent = supportAgentService.createOrUpdateAgent(agent);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAgent);
    }

    // Get agents by department
    @GetMapping("/department/{departement}")
    public List<SupportAgent> getAgentsByDepartment(@PathVariable Departement departement) {
        return supportAgentService.getAgentsByDepartement(departement);
    }

    // Delete an agent
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAgent(@PathVariable Long id) {
        boolean deleted = supportAgentService.deleteAgent(id);
        return deleted ? ResponseEntity.status(HttpStatus.NO_CONTENT).build() :
                ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }


}
