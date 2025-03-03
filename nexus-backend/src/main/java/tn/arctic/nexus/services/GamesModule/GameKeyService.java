package tn.arctic.nexus.services.GamesModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.GameKey;
import tn.arctic.nexus.repositories.GamesModule.IGameKeyRepository;

import java.util.List;

@Service
public class GameKeyService implements IGameKeyService{
    @Autowired
    IGameKeyRepository gameKeyRepository;

    @Override
    public GameKey createGameKey(GameKey gameKey) {
        return gameKeyRepository.save(gameKey);
    }

    @Override
    public void deleteGameKey(Long id) {
        gameKeyRepository.deleteById(id);
    }

    @Override
    public List<GameKey> getGameKeys() {
        return (List<GameKey>) gameKeyRepository.findAll();
    }

    @Override
    public GameKey getGameKeyById(Long id) {
        return gameKeyRepository.findById(id).orElse(null);
    }

    @Override
    public GameKey getGameKeyByUserId(Long id) {
        return gameKeyRepository.findGameKeyByUserId(id);
    }
}
