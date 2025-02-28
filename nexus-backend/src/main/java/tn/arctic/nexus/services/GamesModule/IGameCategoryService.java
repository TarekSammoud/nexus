package tn.arctic.nexus.services.GamesModule;

import tn.arctic.nexus.controllers.GamesModule.GameController;
import tn.arctic.nexus.entities.Game;
import tn.arctic.nexus.entities.GameCategory;

import java.util.List;

public interface IGameCategoryService {
    public GameCategory addGameCategory(GameCategory gameCategory);
    public List<GameCategory> getAllGameCategories();
    public List<GameCategory> getAllCategoriesByName(String name);
    public GameCategory getGameCategoryById(Long id);
    public void deleteGameCategoryById(Long id);
    public GameCategory updateGameCategory(GameCategory gameCategory);

}
