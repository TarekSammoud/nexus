package tn.arctic.nexus.controllers.GamesModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.Game;
import tn.arctic.nexus.entities.GameCategory;
import tn.arctic.nexus.services.GamesModule.IGameService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/games")
public class GameController {
    @Autowired
    IGameService gameService;

    @PostMapping("/add-game")
    public Game addGame(@RequestBody Game game){
        return gameService.addGame(game);
    }

    @GetMapping("/all-games")
    public List<Game> getAllGames(){
        return  gameService.getAllGames();
    }
    @GetMapping("/{id}")
    public Game getGameById(@PathVariable("id") Long id){
        return gameService.getGameById(id);
    }

    @GetMapping("/filter-by-categories")
    public List<Game> getAllGamesByCategory(@RequestBody List<GameCategory> gameCategories)
    {
        return gameService.getAllGamesByCategory(gameCategories);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteGameById(@PathVariable("id")Long id){
        gameService.deleteGameById(id);
    }

    @PutMapping("/update-game")
    public Game updateGame(@RequestBody Game game){
        return gameService.updateGame(game);
    }

}
