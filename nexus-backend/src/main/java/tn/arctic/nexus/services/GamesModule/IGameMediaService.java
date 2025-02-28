package tn.arctic.nexus.services.GamesModule;

import tn.arctic.nexus.entities.GameMedia;

import java.util.List;

public interface IGameMediaService {
    public GameMedia addGameMedia(GameMedia gameMedia);

    public List<GameMedia> getAllGameMedia();

    public GameMedia getGameMediaById(Long id);

    public List<GameMedia> getMediaByGameId(Long gameId);

    public GameMedia updateGameMedia(GameMedia gameMedia);

    public void deleteGameMedia(Long id);


}
