package tn.arctic.nexus.services.GamesModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.GameReview;
import tn.arctic.nexus.entities.User;
import tn.arctic.nexus.repositories.GamesModule.IGameReviewRepository;

import java.util.List;

@Service
public class GameReviewService implements IGameReviewService{
    @Autowired
    IGameReviewRepository gameReviewRepository;

    @Override
    public GameReview addReview(GameReview gameReview) {
        return gameReviewRepository.save(gameReview);
    }

    @Override
    public List<GameReview> getAllReviews() {
        return gameReviewRepository.findAll();
    }

    @Override
    public GameReview getReviewById(Long id) {
        return gameReviewRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteReviewById(Long id) {
        gameReviewRepository.deleteById(id);
    }

    @Override
    public GameReview updateReview(GameReview gameReview) {
        return gameReviewRepository.save(gameReview);
    }

    @Override
    public List<GameReview> getReviewsByUser(User user) {
        return gameReviewRepository.getGameReviewByUser(user);
    }

    @Override
    public List<GameReview> getReviewsByUserId(Long id) {
        return gameReviewRepository.getGameReviewsByUserId(id);
    }
}
