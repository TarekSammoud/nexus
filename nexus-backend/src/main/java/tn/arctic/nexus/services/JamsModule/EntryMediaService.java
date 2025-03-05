package tn.arctic.nexus.services.JamsModule;

import tn.arctic.nexus.entities.EntryMedia;
import tn.arctic.nexus.repositories.JamsModule.IEntryMediaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EntryMediaService implements IEntryMediaService {

    @Autowired
    private IEntryMediaRepository mediaRepository;

    @Override
    public List<EntryMedia> getAllMedia() {
        return mediaRepository.findAll();
    }

    @Override
    public List<EntryMedia> getMediaByEntry(Long entryId) {
        return mediaRepository.findByEntryId(entryId);
    }

    @Override
    public Optional<EntryMedia> getMediaById(Long id) {
        return mediaRepository.findById(id);
    }

    @Override
    public EntryMedia createMedia(EntryMedia media) {
        return mediaRepository.save(media);
    }

    @Override
    public EntryMedia updateMedia(EntryMedia entryMedia) {
        return mediaRepository.save(entryMedia);
    }

    @Override
    public void deleteMedia(Long id) {
        mediaRepository.deleteById(id);
    }
}