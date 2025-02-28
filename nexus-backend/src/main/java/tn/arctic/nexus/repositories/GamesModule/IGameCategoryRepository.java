package tn.arctic.nexus.repositories.GamesModule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.arctic.nexus.entities.GameCategory;

import java.util.List;

@Repository

public interface IGameCategoryRepository extends JpaRepository<GameCategory,Long> {
    List<GameCategory> findByName(String name);
}
