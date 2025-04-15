package tn.arctic.nexus.repositories.JamsModule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.arctic.nexus.entities.Entry;
import java.util.List;

@Repository
public interface IEntryRepository extends JpaRepository<Entry, Long> {
    List<Entry> findByUserId(Long userId);
    List<Entry> findByJamId(Long jamId);
}
