package tn.arctic.nexus.services.GamesModule;

import tn.arctic.nexus.entities.GameDiscount;

import java.util.Date;
import java.util.List;

public interface IGameDiscountService {

    public GameDiscount createDiscount(GameDiscount gd);

    public GameDiscount getDiscountForGame(Long gameId);

    public GameDiscount updateDiscount(GameDiscount gd);

    public void deleteDiscount(Long id);
}
