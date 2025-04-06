package tn.arctic.nexus.services.GamesModule;

import jakarta.transaction.Transactional;
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

    @Transactional
    @Override
    public void deleteGameById(Long id) {
        gameRepository.deleteById(id);
    }

    @Override
    public Game updateGame(Game game) {
        return gameRepository.save(game);
    }

    @Override
    public Integer getNumberOfGames(){
        return gameRepository.findAll().size();
    }

    @Override
    public List<Game> getGamesByCategoryName(String name) {
        return gameRepository.findGamesByCategoryName(name);
    }

    @Override
    public List<Game> getAllGamesBySingleCategory(String name) {
        return this.gameRepository.findGamesByCategoryName(name);
    }
}
