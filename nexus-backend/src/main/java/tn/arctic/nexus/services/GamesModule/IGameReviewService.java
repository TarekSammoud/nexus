package tn.arctic.nexus.services.GamesModule;

import tn.arctic.nexus.entities.GameReview;
import tn.arctic.nexus.entities.User;

import java.util.List;

public interface IGameReviewService {
    public GameReview addReview(GameReview game);
    public List<GameReview> getAllReviews();
    public GameReview getReviewById(Long id);
    public void deleteReviewById(Long id);
    public GameReview updateReview(GameReview game);
    public List<GameReview> getReviewsByUser(User user);

    List<GameReview> getReviewsByUserId(Long id);
}
