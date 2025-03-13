package tn.arctic.nexus.services.CommunityModule;

import tn.arctic.nexus.entities.Publication;

import java.util.List;

public interface IPublicationService {
    Publication createPublication(Publication publication);
    List<Publication> getAllPublications();
    Publication getPublicationById(Long id);
    Publication updatePublication(Long id, Publication updatedPublication);
    void deletePublication(Long id);
}
