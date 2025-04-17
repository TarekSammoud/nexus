package tn.arctic.nexus.services.GamesModule;

import tn.arctic.nexus.entities.Game;
import tn.arctic.nexus.entities.GameCategory;
import tn.arctic.nexus.entities.GameMedia;
import tn.arctic.nexus.entities.GamePlatform;

import java.util.List;

public interface IGameService {
    public Game addGame(Game game);
    public List<Game> getAllGames();
    public Game getGameById(Long id);
    public List<Game> getAllGamesByCategory(List<GameCategory> categories);
    public void deleteGameById(Long id);
    public List<Game> getBrowserGames();
    public Game updateGame(Game game);
   // public List<GameMedia> getGameMediaByGameId(Long id);
    public Integer getNumberOfGames() ;

    public List<Game> getGamesByCategoryName(String name);
    Game getLastId();


    List<Game> getAllGamesBySingleCategory(String name);
}
