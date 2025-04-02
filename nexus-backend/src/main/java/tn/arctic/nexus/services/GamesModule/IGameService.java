package tn.arctic.nexus.services.GamesModule;

import tn.arctic.nexus.entities.Game;
import tn.arctic.nexus.entities.GameCategory;
import tn.arctic.nexus.entities.GameMedia;

import java.util.List;

public interface IGameService {
    public Game addGame(Game game);

    public List<Game> addMultipleGames(List<Game> games);
    public List<Game> getAllGames();
    public Game getGameById(Long id);
    public List<Game> getAllGamesByCategory(List<GameCategory> categories);
    public List<Game> getAllGamesBySingleCategory(String name);

    public void deleteGameById(Long id);
    public Game updateGame(Game game);
   // public List<GameMedia> getGameMediaByGameId(Long id);
    public Integer getNumberOfGames() ;

}
