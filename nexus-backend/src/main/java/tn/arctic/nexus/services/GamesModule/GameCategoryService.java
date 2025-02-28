package tn.arctic.nexus.services.GamesModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.Game;
import tn.arctic.nexus.entities.GameCategory;
import tn.arctic.nexus.repositories.GamesModule.IGameCategoryRepository;

import java.util.List;

@Service
public class GameCategoryService implements IGameCategoryService {
    @Autowired
    IGameCategoryRepository gameCategoryRepository;

    @Override
    public GameCategory addGameCategory(GameCategory gameCategory) {
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
       gameCategoryRepository.deleteById(id);
    }

    @Override
    public GameCategory updateGameCategory(GameCategory gameCategory) {
        return gameCategoryRepository.save(gameCategory);
    }
}
