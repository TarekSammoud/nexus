package tn.arctic.nexus.services.JamsModule;

import tn.arctic.nexus.entities.EntryMedia;

import java.util.List;
import java.util.Optional;

public interface IEntryMediaService {
    List<EntryMedia> getAllMedia();
    List<EntryMedia> getMediaByEntry(Long entryId);

    Optional<EntryMedia> getMediaById(Long id);
    EntryMedia createMedia(EntryMedia media);
    EntryMedia updateMedia(EntryMedia entryMedia);

    void deleteMedia(Long id);
}