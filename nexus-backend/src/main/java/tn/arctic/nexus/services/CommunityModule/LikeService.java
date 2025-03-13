package tn.arctic.nexus.services.CommunityModule;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.Like;
import tn.arctic.nexus.repositories.CommunityModule.LikeRepository;

import java.util.List;

@Service
public class LikeService implements ILikeService {

    @Autowired
    private LikeRepository likeRepository;

    @Override
    public Like createLike(Like like) {
        return likeRepository.save(like);
    }

    @Override
    public List<Like> getAllLikes() {
        return likeRepository.findAll();
    }

    @Override
    public void deleteLike(Long id) {
        likeRepository.deleteById(id);
    }
}
