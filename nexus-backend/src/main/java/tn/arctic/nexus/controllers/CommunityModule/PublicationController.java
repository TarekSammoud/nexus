package tn.arctic.nexus.controllers.CommunityModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.Publication;
import tn.arctic.nexus.services.CommunityModule.PublicationService;

import java.util.List;

@RestController
@RequestMapping("/api/publications")
public class PublicationController {

    @Autowired
    private PublicationService publicationService;

    // Create a new Publication (must reference an existing category)
    @PostMapping
    public Publication createPublication(@RequestBody Publication publication) {
        if (publication.getCategory() == null) {
            throw new IllegalArgumentException("Publication must reference an existing category");
        }
        return publicationService.createPublication(publication);
    }

    // Get all Publications
    @GetMapping
    public List<Publication> getAllPublications() {
        return publicationService.getAllPublications();
    }

    // Get a Publication by ID
    @GetMapping("/{id}")
    public Publication getPublicationById(@PathVariable Long id) {
        return publicationService.getPublicationById(id)
                .orElseThrow(() -> new RuntimeException("Publication not found"));

    }

    // Update a Publication
    @PutMapping("/{id}")
    public Publication updatePublication(@PathVariable Long id, @RequestBody Publication updatedPublication) {
        return publicationService.updatePublication(id, updatedPublication);
    }

    // Delete a Publication by ID
    @DeleteMapping("/{id}")
    public void deletePublication(@PathVariable Long id) {
        publicationService.deletePublication(id);
    }
}
