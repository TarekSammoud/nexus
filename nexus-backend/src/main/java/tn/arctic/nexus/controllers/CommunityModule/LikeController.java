package tn.arctic.nexus.controllers.CommunityModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.Like;
import tn.arctic.nexus.services.CommunityModule.LikeService;

import java.util.List;


@RestController
@RequestMapping("/api/likes")
public class LikeController  {

    @Autowired
    private LikeService likeService;

    @PostMapping
    public ResponseEntity<Like> createLike(@RequestBody Like like) {
        return new ResponseEntity<>(likeService.createLike(like), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Like>> getAllLikes() {
        return ResponseEntity.ok(likeService.getAllLikes());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLike(@PathVariable Long id) {
        likeService.deleteLike(id);
        return ResponseEntity.noContent().build();
    }
}
