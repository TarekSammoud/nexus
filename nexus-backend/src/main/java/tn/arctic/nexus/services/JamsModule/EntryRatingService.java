package tn.arctic.nexus.services.JamsModule;

import tn.arctic.nexus.entities.EntryMedia;
import tn.arctic.nexus.entities.EntryRating;
import tn.arctic.nexus.repositories.JamsModule.IEntryRatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EntryRatingService implements IEntryRatingService {

    @Autowired
    private IEntryRatingRepository ratingRepository;

    @Override
    public List<EntryRating> getAllRatings() {
        return ratingRepository.findAll();
    }

    @Override
    public List<EntryRating> getRatingsByEntry(Long entryId) {
        return ratingRepository.findByEntryId(entryId);
    }

    @Override
    public Optional<EntryRating> getRatingById(Long id) {
        return ratingRepository.findById(id);
    }

    @Override
    public EntryRating createRating(EntryRating rating) {
        boolean alreadyRated = ratingRepository
                .findByEntryIdAndUserId(rating.getEntry().getId(), rating.getUser().getId())
                .isPresent();

        if (alreadyRated) {
            throw new RuntimeException("You have already rated this entry.");
        }

        return ratingRepository.save(rating);
    }


    @Override
    public EntryRating updateRating(EntryRating entryRating) {
        return ratingRepository.save(entryRating);
    }
    @Override
    public void deleteRating(Long id) {
        ratingRepository.deleteById(id);
    }



    @Override
    public boolean hasUserRatedEntry(Long userId, Long entryId) {
        return ratingRepository.findByEntryIdAndUserId(entryId, userId).isPresent();
    }

}