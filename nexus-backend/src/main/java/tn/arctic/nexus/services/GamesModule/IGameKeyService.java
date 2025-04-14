package tn.arctic.nexus.services.GamesModule;

import tn.arctic.nexus.entities.Game;
import tn.arctic.nexus.entities.GameKey;

import java.util.List;

public interface IGameKeyService {
    public GameKey createGameKey(GameKey gameKey);
    public void deleteGameKey(Long id);
    public List<GameKey> getGameKeys();
    public GameKey getGameKeyById(Long id);
    public GameKey getGameKeyByUserId(Long id);

}
