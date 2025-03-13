package tn.arctic.nexus.services.CommunityModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.Publication;
import tn.arctic.nexus.repositories.CommunityModule.PublicationRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PublicationService {

    @Autowired
    private PublicationRepository publicationRepository;

    public Publication createPublication(Publication publication) {
        return publicationRepository.save(publication);
    }

    public List<Publication> getAllPublications() {
        return publicationRepository.findAll();
    }

    // Return Optional<Publication>
    public Optional<Publication> getPublicationById(Long id) {
        return publicationRepository.findById(id);  // Returns Optional
    }

    public Publication updatePublication(Long id, Publication updatedPublication) {
        // Assume that we fetch, update, and save the publication
        Publication publication = publicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Publication not found"));
        publication.setTitle(updatedPublication.getTitle());
        publication.setContent(updatedPublication.getContent());
        publication.setPinned(updatedPublication.isPinned());
        publication.setLocked(updatedPublication.isLocked());
        return publicationRepository.save(publication);
    }

    public void deletePublication(Long id) {
        publicationRepository.deleteById(id);
    }
}
