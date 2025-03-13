package tn.arctic.nexus.controllers.CommunityModule;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.Commentaire;
import tn.arctic.nexus.services.CommunityModule.CommentaireService;

import java.util.List;

@RestController
@RequestMapping("/api/commentaires")
public class CommentaireController {


    @Autowired
    private CommentaireService commentaireService;

    @PostMapping
    public ResponseEntity<Commentaire> createCommentaire(@RequestBody Commentaire commentaire) {
        return new ResponseEntity<>(commentaireService.createCommentaire(commentaire), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Commentaire>> getAllCommentaires() {
        return ResponseEntity.ok(commentaireService.getAllCommentaires());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Commentaire> getCommentaireById(@PathVariable Long id) {
        return ResponseEntity.ok(commentaireService.getCommentaireById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCommentaire(@PathVariable Long id) {
        commentaireService.deleteCommentaire(id);
        return ResponseEntity.noContent().build();
    }


}
