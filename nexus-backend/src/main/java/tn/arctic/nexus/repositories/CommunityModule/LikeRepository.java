package tn.arctic.nexus.repositories.CommunityModule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.arctic.nexus.entities.Like;

import java.util.List;

@Repository

public interface LikeRepository extends JpaRepository<Like, Long> {
    List<Like> findByPublicationId(Long publicationId);

}
