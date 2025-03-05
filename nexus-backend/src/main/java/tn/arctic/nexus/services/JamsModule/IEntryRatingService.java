package tn.arctic.nexus.services.JamsModule;

import tn.arctic.nexus.entities.EntryRating;

import java.util.List;
import java.util.Optional;

public interface IEntryRatingService {
    List<EntryRating> getAllRatings();
    List<EntryRating> getRatingsByEntry(Long entryId);
    Optional<EntryRating> getRatingById(Long id);
    EntryRating createRating(EntryRating rating);
    void deleteRating(Long id);
    public EntryRating updateRating(EntryRating entryRating);
}