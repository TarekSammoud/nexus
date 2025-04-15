package tn.arctic.nexus.services.GamesModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.GameItem;
import tn.arctic.nexus.repositories.GameItemRepository;

import java.util.List;

@Service
public class GameItemService {
    @Autowired
    private GameItemRepository gameItemRepository;

    public List<GameItem> findAll() {
        return gameItemRepository.findAll();
    }

    public GameItem findById(Long id) {
        return gameItemRepository.findById(id).orElse(null);
    }
}
