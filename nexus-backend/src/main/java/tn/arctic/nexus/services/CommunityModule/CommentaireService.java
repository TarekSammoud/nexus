package tn.arctic.nexus.services.CommunityModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.Commentaire;
import tn.arctic.nexus.repositories.CommunityModule.CommentaireRepository;

import java.util.List;

@Service

public class CommentaireService implements ICommentaireService{

    @Autowired
    private CommentaireRepository commentaireRepository;

    @Override
    public Commentaire createCommentaire(Commentaire commentaire) {
        return commentaireRepository.save(commentaire);
    }

    @Override
    public List<Commentaire> getAllCommentaires() {
        return commentaireRepository.findAll();
    }

    @Override
    public Commentaire getCommentaireById(Long id) {
        return commentaireRepository.findById(id)
                .orElseThrow();
    }

    @Override
    public void deleteCommentaire(Long id) {
        Commentaire commentaire = getCommentaireById(id);
        commentaireRepository.delete(commentaire);
    }
}
