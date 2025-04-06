package tn.arctic.nexus.controllers.GamesModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.Game;
import tn.arctic.nexus.entities.GameCategory;
import tn.arctic.nexus.entities.GameReview;
import tn.arctic.nexus.services.GamesModule.IGameReviewService;

import java.util.List;

@RestController
@RequestMapping("/games/reviews")
public class GameReviewController {
    @Autowired
    IGameReviewService gameReviewService;

    @PostMapping("/add")
    public GameReview addGameReview(@RequestBody GameReview gameReview){
        return gameReviewService.addReview(gameReview);
    }

    @GetMapping("/all")
    public List<GameReview> getAllGameReviews(){
        return  gameReviewService.getAllReviews();
    }
    @GetMapping("/{id}")
    public GameReview getGameReviewById(@PathVariable("id") Long id){
        return gameReviewService.getReviewById(id);
    }


    @DeleteMapping("/delete/{id}")
    public void deleteGameReviewById(@PathVariable("id")Long id){
        gameReviewService.deleteReviewById(id);
    }

    @PutMapping("/update")
    public GameReview updateGameReview(@RequestBody GameReview gameReview){
        return gameReviewService.updateReview(gameReview);
    }

    @GetMapping("/user/{id}")
    public List<GameReview> getGameReviewsByUserId(@PathVariable("id") Long id){
        return gameReviewService.getReviewsByUserId(id);
    }

}
