package tn.arctic.nexus.services.GamesModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.GameMedia;
import tn.arctic.nexus.repositories.GamesModule.IGameMediaRepository;

import java.util.List;

@Service
public class GameMediaService implements IGameMediaService{
    @Autowired
    IGameMediaRepository gameMediaRepository;
    @Override
    public GameMedia addGameMedia(GameMedia gameMedia) {
        return gameMediaRepository.save(gameMedia);
    }

    @Override
    public List<GameMedia> getAllGameMedia() {
        return (List<GameMedia>) gameMediaRepository.findAll();
    }

    @Override
    public GameMedia getGameMediaById(Long id) {
        return gameMediaRepository.findById(id).orElse(null);
    }

    @Override
    public List<GameMedia> getMediaByGameId(Long gameId) {
        return gameMediaRepository.findGameMediaByGameId(gameId);
    }


    @Override
    public GameMedia updateGameMedia(GameMedia gameMedia) {
        return gameMediaRepository.save(gameMedia);
    }

    @Override
    public void deleteGameMedia(Long id) {
        gameMediaRepository.deleteById(id);
    }
}
