package tn.arctic.nexus.repositories.JamsModule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.arctic.nexus.entities.EntryRating;

import java.util.List;

@Repository
public interface IEntryRatingRepository extends JpaRepository<EntryRating, Long> {
    List<EntryRating> findByEntryId(Long entryId);
}
