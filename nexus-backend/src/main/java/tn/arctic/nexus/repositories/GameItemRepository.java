package tn.arctic.nexus.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.arctic.nexus.entities.GameItem;

@Repository
public interface GameItemRepository extends JpaRepository<GameItem, Long> {
}
