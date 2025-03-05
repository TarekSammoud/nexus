package tn.arctic.nexus.services.JamsModule;

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

        return ratingRepository.save(rating);
    }

    @Override
    public void deleteRating(Long id) {
        ratingRepository.deleteById(id);
    }
}