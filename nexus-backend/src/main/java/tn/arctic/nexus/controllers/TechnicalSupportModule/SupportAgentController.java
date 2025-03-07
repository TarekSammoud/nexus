package tn.arctic.nexus.controllers.TechnicalSupportModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.SupportAgent;
import tn.arctic.nexus.services.TechnicalSupportModule.SupportAgentService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/agents")
public class SupportAgentController {

    @Autowired
    private SupportAgentService agentService;

    @GetMapping
    public List<SupportAgent> getAllAgents() {
        return agentService.getAllAgents();
    }

    @GetMapping("/{id}")
    public Optional<SupportAgent> getAgentById(@PathVariable Long id) {
        return agentService.getAgentById(id);
    }

    @PostMapping
    public SupportAgent createAgent(@RequestBody SupportAgent agent) {
        return agentService.createAgent(agent);
    }

    @DeleteMapping("/{id}")
    public void deleteAgent(@PathVariable Long id) {
        agentService.deleteAgent(id);
    }
}