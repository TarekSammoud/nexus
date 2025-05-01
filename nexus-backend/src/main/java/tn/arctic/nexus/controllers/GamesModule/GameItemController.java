package tn.arctic.nexus.controllers.GamesModule ;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.GameItem;
import tn.arctic.nexus.repositories.GameItemRepository;

import java.util.List;

@CrossOrigin(origins = "http://nexus-frontend.frontend.svc.cluster.local:4200")
@RestController
@RequestMapping("/gameitem")
public class GameItemController {

    @Autowired
    private GameItemRepository gameItemRepository;

    @GetMapping
    public List<GameItem> getAllGameItems() {
        return gameItemRepository.findAll();
    }

    @GetMapping("/{id}")
    public GameItem getGameItemById(@PathVariable Long id) {
        return gameItemRepository.findById(id).orElse(null);
    }
}
