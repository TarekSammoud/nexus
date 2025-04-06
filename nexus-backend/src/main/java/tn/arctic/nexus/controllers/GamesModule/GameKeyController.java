package tn.arctic.nexus.controllers.GamesModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.GameKey;
import tn.arctic.nexus.services.GamesModule.IGameKeyService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/games/game-keys")
public class GameKeyController {

    @Autowired
    IGameKeyService gameKeyService;

    @PostMapping("/add")
    public GameKey addGameKey(@RequestBody GameKey gameKey) {
        return gameKeyService.createGameKey(gameKey);
    }

    @GetMapping("/all")
    public List<GameKey> getAllGameKeys() {
        return gameKeyService.getGameKeys();
    }

    @GetMapping("/{id}")
    public GameKey getGameKeyById(@PathVariable("id") Long id) {
        return gameKeyService.getGameKeyById(id);
    }

    @GetMapping("/user/{userId}")
    public GameKey getGameKeyByUserId(@PathVariable("userId") Long userId) {
        return gameKeyService.getGameKeyByUserId(userId);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteGameKeyById(@PathVariable("id") Long id) {
        gameKeyService.deleteGameKey(id);
    }
}
