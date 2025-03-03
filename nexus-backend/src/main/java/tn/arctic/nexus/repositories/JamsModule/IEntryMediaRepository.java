package tn.arctic.nexus.repositories.JamsModule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.arctic.nexus.entities.EntryMedia;

import java.util.List;

@Repository
public interface IEntryMediaRepository extends JpaRepository<EntryMedia, Long> {
    List<EntryMedia> findByEntryId(Long entryId);
}
