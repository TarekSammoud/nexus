package tn.arctic.nexus.controllers.TechnicalSupportModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.SupportAgent;
import tn.arctic.nexus.entities.Departement;
import tn.arctic.nexus.services.TechnicalSupportModule.SupportAgentService;

import java.util.List;
import java.util.Optional;
@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/agents")
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

    // Get agents by department
    @GetMapping("/department/{departement}")
    public ResponseEntity<List<SupportAgent>> getAgentsByDepartment(@PathVariable Departement departement) {
        List<SupportAgent> agents = supportAgentService.getAgentsByDepartement(departement);
        if (agents != null && !agents.isEmpty()) {
            return ResponseEntity.ok(agents);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Create a new agent
    @PostMapping("createagent")
    public ResponseEntity<SupportAgent> createAgent(@RequestBody SupportAgent agent) {
        SupportAgent savedAgent = supportAgentService.createAgent(agent);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAgent);
    }

    // Update an existing agent
    @PutMapping("/{id}")
    public ResponseEntity<SupportAgent> updateAgent(@PathVariable Long id, @RequestBody SupportAgent agent) {
        Optional<SupportAgent> updatedAgent = supportAgentService.updateAgent(id, agent);
        return updatedAgent.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Delete an agent
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAgent(@PathVariable Long id) {
        boolean deleted = supportAgentService.deleteAgent(id);
        return deleted ? ResponseEntity.status(HttpStatus.NO_CONTENT).build() :
                ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    // Combined method to get agent by ID or by department
    @GetMapping("/search")
    public ResponseEntity<?> getAgent(@RequestParam(required = false) Long id,
                                      @RequestParam(required = false) Departement departement) {
        if (id != null) {
            return getAgentById(id);  // Reuse the existing getAgentById method
        } else if (departement != null) {
            return getAgentsByDepartment(departement);  // Reuse the existing getAgentsByDepartment method
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Please provide either an agent ID or department.");
        }
    }
    @GetMapping("/ranked")
    public List<SupportAgent> getRankedAgents() {
        return supportAgentService.getAgentsRankedByAverageRating();
    }
}
