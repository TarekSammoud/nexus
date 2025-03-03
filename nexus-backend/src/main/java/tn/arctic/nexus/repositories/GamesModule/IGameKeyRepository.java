package tn.arctic.nexus.repositories.GamesModule;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.arctic.nexus.entities.GameKey;

public interface IGameKeyRepository extends JpaRepository<GameKey,Long> {
    GameKey findGameKeyByUserId(Long id);
}
