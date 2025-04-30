package tn.arctic.nexus.controllers.GamesModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.GameReview;
import tn.arctic.nexus.services.GamesModule.IGameReviewService;
import tn.arctic.nexus.services.GamesModule.ISpamCheckService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/games/reviews")
@CrossOrigin(origins = "http://localhost:4200")

public class GameReviewController {
    @Autowired
    IGameReviewService gameReviewService;
    @Autowired
    ISpamCheckService spamCheckService;



    @PostMapping("/check")
    public ResponseEntity<?> checkReview(@RequestBody GameReview review) {
        // Send review to Python API for spam check
        Map<String, Object> result = spamCheckService.checkReview(review.getReviewText());

        return ResponseEntity.ok(result);
    }

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
