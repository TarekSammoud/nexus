package tn.arctic.nexus.services.GamesModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.Game;
import tn.arctic.nexus.entities.GameCategory;
import tn.arctic.nexus.repositories.GamesModule.IGameRepository;

import java.util.List;

@Service
public class GameService implements IGameService{
    @Autowired
    IGameRepository gameRepository;

    @Override
    public Game addGame(Game game) {
        return this.gameRepository.save(game);
    }

    @Override
    public List<Game> getAllGames() {
        return (List<Game>) this.gameRepository.findAll();
    }

    @Override
    public Game getGameById(Long id) {
        return this.gameRepository.findById(id).orElse(null);
    }

    @Override
    public List<Game> getAllGamesByCategory(List<GameCategory> categories) {
        return this.gameRepository.findByCategoriesIn(categories);
    }

    @Override
    public boolean deleteGameById(Long id) {
        return false;
    }

    @Override
    public Game updateGame(Game game) {
        return gameRepository.save(game);
    }
}
