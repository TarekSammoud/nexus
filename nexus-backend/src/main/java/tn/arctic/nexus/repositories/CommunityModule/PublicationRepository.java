package tn.arctic.nexus.repositories.CommunityModule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.arctic.nexus.entities.Publication;

import java.util.List;

@Repository

public interface PublicationRepository extends JpaRepository<Publication, Long> {
    List<Publication> findByTitleContaining(String title);

}
