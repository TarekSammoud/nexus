package tn.arctic.nexus.services.CommunityModule;

import tn.arctic.nexus.entities.Commentaire;

import java.util.List;

public interface ICommentaireService {

    Commentaire createCommentaire(Commentaire commentaire);
    List<Commentaire> getAllCommentaires();
    Commentaire getCommentaireById(Long id);
    void deleteCommentaire(Long id);
}
