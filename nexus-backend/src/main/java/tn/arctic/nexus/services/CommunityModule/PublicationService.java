package tn.arctic.nexus.services.CommunityModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.Publication;
import tn.arctic.nexus.repositories.CommunityModule.PublicationRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

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
        return publicationRepository.findById(id);
    }

    public Publication updatePublication(Long id, Publication updatedPublication) {
        // Assume that we fetch, update, and save the publication
        Publication publication = publicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Publication not found"));
        publication.setTitle(updatedPublication.getTitle());
        publication.setContent(updatedPublication.getContent());
        publication.setPinned(updatedPublication.isPinned());
        publication.setLocked(updatedPublication.isLocked());
        publication.setImageUrl(updatedPublication.getImageUrl());
        return publicationRepository.save(publication);
    }

    public void deletePublication(Long id) {
        publicationRepository.deleteById(id);
    }



    public List<Publication> getAllPublicationsSorted() {
        return publicationRepository.findAllSortedByPinned();
    }



/*    public List<Publication> getPublicationsVisibles() {
        return publicationRepository.findPublicationsWithNoOrUnresolvedReports();
    }
*/

    public List<Publication> getPublicationsVisibles() {
        return publicationRepository.findVisiblePublicationsSorted();
    }



    public Map<String, Long> countPublicationsByCategory() {
        return publicationRepository.findAll().stream()
                .filter(pub -> pub.getCategory() != null)
                .collect(Collectors.groupingBy(
                        pub -> pub.getCategory().getName(),
                        Collectors.counting()
                ));
    }



}
