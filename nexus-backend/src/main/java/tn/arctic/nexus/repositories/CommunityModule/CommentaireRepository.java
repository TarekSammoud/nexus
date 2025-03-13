package tn.arctic.nexus.repositories.CommunityModule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.arctic.nexus.entities.Commentaire;

import java.util.List;
@Repository

public interface CommentaireRepository extends JpaRepository<Commentaire, Long> {
    List<Commentaire> findByPublicationId(Long publicationId);

}
