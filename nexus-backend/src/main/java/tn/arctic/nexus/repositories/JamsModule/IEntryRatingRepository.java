package tn.arctic.nexus.repositories.JamsModule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.arctic.nexus.entities.EntryRating;

import java.util.List;
import java.util.Optional;

@Repository
public interface IEntryRatingRepository extends JpaRepository<EntryRating, Long> {
    List<EntryRating> findByEntryId(Long entryId);
    Optional<EntryRating> findByEntryIdAndUserId(Long entryId, Long userId);

}
