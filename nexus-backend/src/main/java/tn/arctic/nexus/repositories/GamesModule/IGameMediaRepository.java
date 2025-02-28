package tn.arctic.nexus.repositories.GamesModule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import tn.arctic.nexus.entities.GameMedia;

import java.util.List;

public interface IGameMediaRepository extends JpaRepository<GameMedia,Long> {
    public List<GameMedia> findGameMediaByGameId(Long id);
}
