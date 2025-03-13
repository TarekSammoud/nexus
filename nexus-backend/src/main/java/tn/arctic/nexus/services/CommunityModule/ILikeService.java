package tn.arctic.nexus.services.CommunityModule;

import tn.arctic.nexus.entities.Like;

import java.util.List;

public interface ILikeService {

    Like createLike(Like like);
    List<Like> getAllLikes();
    void deleteLike(Long id);
}
