package tn.arctic.nexus.repositories.GamesModule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.arctic.nexus.entities.Game;
import tn.arctic.nexus.entities.GameCategory;
import tn.arctic.nexus.entities.GamePlatform;

import java.util.List;

@Repository
public interface IGameRepository extends JpaRepository<Game,Long> {
    List<Game> findByCategoriesIn(List<GameCategory> gameCategories);
    @Query("SELECT g FROM Game g JOIN g.categories c WHERE c.name = :categoryName")
    List<Game> findGamesByCategoryName(String categoryName);
    Game findTopByOrderByIdDesc();
    @Query("SELECT g FROM Game g WHERE g.platforms IN :platforms")
    List<Game> findGamesByPlatforms(@Param("platforms") List<GamePlatform> platforms);

    Game findByGameDiscountId(Long id);

}
