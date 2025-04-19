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



    @Query("""
SELECT DISTINCT p
FROM Publication p
LEFT JOIN p.reports r
GROUP BY p
HAVING COUNT(r) = 0 OR SUM(CASE WHEN r.status = 'RESOLVED' THEN 1 ELSE 0 END) < COUNT(r)
""")
    List<Publication> findPublicationsWithNoOrUnresolvedReports();


    @Query("""
SELECT DISTINCT p
FROM Publication p
LEFT JOIN p.reports r
GROUP BY p
HAVING COUNT(r) = 0 OR SUM(CASE WHEN r.status = 'RESOLVED' THEN 1 ELSE 0 END) < COUNT(r)
ORDER BY p.isPinned DESC, p.id DESC
""")
    List<Publication> findVisiblePublicationsSorted();


}
