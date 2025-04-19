package tn.arctic.nexus.repositories.CommunityModule;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.arctic.nexus.entities.Sondage;

import java.util.List;

public interface SondageRepository extends JpaRepository<Sondage, Long> {
    List<Sondage> findByActiveTrue();
}