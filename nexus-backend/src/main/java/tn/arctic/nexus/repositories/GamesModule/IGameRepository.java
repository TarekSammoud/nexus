package tn.arctic.nexus.repositories.GamesModule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import tn.arctic.nexus.entities.Game;
import tn.arctic.nexus.entities.GameCategory;

import java.util.List;

@Repository
public interface IGameRepository extends JpaRepository<Game,Long> {
    List<Game> findByCategoriesIn(List<GameCategory> gameCategories);
}
