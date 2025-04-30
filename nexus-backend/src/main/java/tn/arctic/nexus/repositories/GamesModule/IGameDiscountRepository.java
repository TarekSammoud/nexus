package tn.arctic.nexus.repositories.GamesModule;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.arctic.nexus.entities.GameDiscount;

import java.time.LocalDateTime;
import java.util.List;

public interface IGameDiscountRepository extends JpaRepository<GameDiscount,Long> {
    GameDiscount findByGameId(Long id);
    List<GameDiscount> findBySaleEndDateBefore(LocalDateTime now);
}
