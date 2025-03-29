package tn.arctic.nexus.controllers.CommunityModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.Sondage;
import tn.arctic.nexus.services.CommunityModule.ISondageService;

import java.util.List;

@RestController
@RequestMapping("/api/sondages")
@CrossOrigin(origins = "http://localhost:4200")
public class SondageController {

    @Autowired
    private ISondageService sondageService;

    @PostMapping("/create")
    public ResponseEntity<Sondage> create(@RequestBody Sondage sondage) {
        return ResponseEntity.ok(sondageService.createSondage(sondage));
    }

    @GetMapping
    public List<Sondage> getAll() {
        return sondageService.getAllSondages();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sondage> getById(@PathVariable Long id) {
        return sondageService.getSondageById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        sondageService.deleteSondage(id);
    }
}