package tn.arctic.nexus.repositories.CommunityModule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tn.arctic.nexus.entities.Publication;

import java.util.List;

@Repository

public interface PublicationRepository extends JpaRepository<Publication, Long> {
    List<Publication> findByTitleContaining(String title);


    @Query("SELECT p FROM Publication p ORDER BY p.isPinned DESC, p.id DESC")
    List<Publication> findAllSortedByPinned();

}
