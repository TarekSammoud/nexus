package tn.arctic.nexus.repositories.GamesModule;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.arctic.nexus.entities.GameReview;
import tn.arctic.nexus.entities.User;

import java.util.List;

public interface IGameReviewRepository extends JpaRepository<GameReview,Long> {

    public List<GameReview> getGameReviewByUser(User user);
    public List<GameReview> getGameReviewsByUserId(Long id);
}
