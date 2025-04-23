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
        // Vérifiez si la publication existe
        Publication publication = publicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Publication non trouvée"));

        // Mettez à jour les champs de la publication
        publication.setTitle(updatedPublication.getTitle());
        publication.setContent(updatedPublication.getContent());
        publication.setPinned(updatedPublication.isPinned());
        publication.setLocked(updatedPublication.isLocked());
        publication.setImageUrl(updatedPublication.getImageUrl());

        // Sauvegardez et renvoyez la publication mise à jour
        return publicationRepository.save(publication);
    }


    public void deletePublication(Long id, Long userId) {
        // Récupérer la publication
        Publication publication = publicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Publication non trouvée"));

        // Vérifier si l'utilisateur est le propriétaire
        if (!publication.getUser().getId().equals(userId)) {
            throw new RuntimeException("Vous n'êtes pas autorisé à supprimer cette publication.");
        }

        // Supprimer la publication
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
