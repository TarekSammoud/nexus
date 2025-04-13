package tn.arctic.nexus.services.GamesModule;

import jdk.jfr.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.Game;
import tn.arctic.nexus.entities.GameCategory;
import tn.arctic.nexus.repositories.GamesModule.IGameCategoryRepository;
import tn.arctic.nexus.repositories.GamesModule.IGameRepository;

import java.util.List;

@Service
public class GameCategoryService implements IGameCategoryService {
    @Autowired
    IGameCategoryRepository gameCategoryRepository;

    @Autowired
    IGameRepository gameRepository;


    @Override
    public GameCategory addGameCategory(GameCategory gameCategory) {
        String name = gameCategory.getName();
        if (name.endsWith(" ")) {
            gameCategory.setName( name.substring(0, name.length() - 1));  // Remove the last underscore if added by replacing space
        }
        gameCategory.setName(gameCategory.getName().replace(" ", "_"));
        return gameCategoryRepository.save(gameCategory);
    }

    @Override
    public List<GameCategory> getAllGameCategories() {
        return (List<GameCategory>) gameCategoryRepository.findAll();
    }

    @Override
    public List<GameCategory> getAllCategoriesByName(String name) {
        return gameCategoryRepository.findByName(name);
    }

    @Override
    public GameCategory getGameCategoryById(Long id) {
        return gameCategoryRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteGameCategoryById(Long id) {
       GameCategory cat = getGameCategoryById(id);
        for (Game game : cat.getGames()) {
            game.getCategories().remove(cat);
            gameRepository.save(game); // persist the change
        }
        gameCategoryRepository.deleteById(id);
    }

    @Override
    public GameCategory updateGameCategory(GameCategory gameCategory) {
        return gameCategoryRepository.save(gameCategory);
    }


}
