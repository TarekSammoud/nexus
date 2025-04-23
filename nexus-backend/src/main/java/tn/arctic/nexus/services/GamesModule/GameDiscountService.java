package tn.arctic.nexus.services.GamesModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.Game;
import tn.arctic.nexus.entities.GameDiscount;
import tn.arctic.nexus.repositories.GamesModule.IGameDiscountRepository;
import tn.arctic.nexus.repositories.GamesModule.IGameRepository;

import java.util.Date;
import java.util.List;

@Service
public class GameDiscountService implements IGameDiscountService{
    @Autowired
    IGameDiscountRepository gameDiscountRepository;

    @Autowired
    IGameRepository gameRepository;

    @Override
    public GameDiscount createDiscount(GameDiscount gd) {
        return this.gameDiscountRepository.save(gd);
    }

    @Override
    public GameDiscount getDiscountForGame(Long gameId) {
        return this.gameDiscountRepository.findByGameId(gameId);
    }

    @Override
    public GameDiscount updateDiscount(GameDiscount gd) {
        return gameDiscountRepository.save(gd);
    }

    @Override
    public void deleteDiscount(Long discountId) {
        Game game = gameRepository.findByGameDiscountId(discountId);
        if (game != null) {
            game.setGameDiscount(null);
            gameRepository.save(game); // update to remove the link
        }
        gameDiscountRepository.deleteById(discountId);
    }

    public GameDiscount getDiscountById(Long discountid) {
        return gameDiscountRepository.findById(discountid).orElse(null);
    }
}
