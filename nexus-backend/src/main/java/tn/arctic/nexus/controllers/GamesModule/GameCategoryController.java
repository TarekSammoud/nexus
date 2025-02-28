package tn.arctic.nexus.controllers.GamesModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.Game;
import tn.arctic.nexus.entities.GameCategory;
import tn.arctic.nexus.services.GamesModule.GameCategoryService;
import tn.arctic.nexus.services.GamesModule.IGameCategoryService;

import java.util.List;

@RestController
@RequestMapping("/games/categories")
public class GameCategoryController {
    @Autowired
    IGameCategoryService gameCategoryService;

    @PostMapping("/add-category")
    public GameCategory addGameCategory(@RequestBody GameCategory gameCategory){
        return gameCategoryService.addGameCategory(gameCategory);
    }


    @GetMapping("/all-categories")
    public List<GameCategory> getAllGameCategories(){
        return gameCategoryService.getAllGameCategories();
    }

    @GetMapping("/filter/{name}")
    public List<GameCategory> getAllGameCategoriesByName(@PathVariable("name") String name){
        return gameCategoryService.getAllCategoriesByName(name);
    }

    @GetMapping("/{id}")
    public GameCategory getGameCategoryById(@PathVariable("id") Long id){
        return gameCategoryService.getGameCategoryById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteGameCategory(@PathVariable("id") Long id){
        gameCategoryService.deleteGameCategoryById(id);
    }

    @PutMapping("/update")
    public GameCategory updateGameCategory(@RequestBody GameCategory gameCategory){
        return gameCategoryService.updateGameCategory(gameCategory);
    }
}
