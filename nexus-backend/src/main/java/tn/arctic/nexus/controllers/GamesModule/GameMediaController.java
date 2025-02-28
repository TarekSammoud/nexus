package tn.arctic.nexus.controllers.GamesModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.GameMedia;
import tn.arctic.nexus.repositories.GamesModule.IGameMediaRepository;
import tn.arctic.nexus.services.GamesModule.IGameMediaService;

import java.util.List;

@RestController
@RequestMapping("/games/media")
public class GameMediaController {
    @Autowired
    IGameMediaService gameMediaService;


    @PostMapping("/add")
    public GameMedia addGameMedia(@RequestBody GameMedia gameMedia) {
        return gameMediaService.addGameMedia(gameMedia);
    }

    @GetMapping("/all")
    public List<GameMedia> getAllGameMedia() {
        return gameMediaService.getAllGameMedia();
    }

    @GetMapping("/{id}")
    public GameMedia getGameMediaById(@PathVariable("id") Long id) {
        return gameMediaService.getGameMediaById(id);
    }

    @GetMapping("/game/{gameId}")
    public List<GameMedia> getMediaByGameId(@PathVariable("gameId") Long gameId) {
        return gameMediaService.getMediaByGameId(gameId);
    }

    @PutMapping("/update")
    public GameMedia updateGameMedia(@RequestBody GameMedia gameMedia) {
        return gameMediaService.updateGameMedia(gameMedia);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteGameMedia(@PathVariable("id") Long id) {
        gameMediaService.deleteGameMedia(id);
    }
}
