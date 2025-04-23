package tn.arctic.nexus.repositories.GamesModule;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.arctic.nexus.entities.GameDiscount;

public interface IGameDiscountRepository extends JpaRepository<GameDiscount,Long> {
    GameDiscount findByGameId(Long id);
}
