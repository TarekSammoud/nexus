package tn.arctic.nexus.repositories.GamesModule;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.arctic.nexus.entities.SystemRequirements;

public interface ISystemRequirementsRepository extends JpaRepository<SystemRequirements,Long> {
}
