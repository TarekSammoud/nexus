package tn.arctic.nexus.services.JamsModule;
import tn.arctic.nexus.entities.Entry;
import tn.arctic.nexus.repositories.JamsModule.IEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EntryService implements IEntryService {

    @Autowired
    private IEntryRepository entryRepository;

    @Override
    public List<Entry> getAllEntries() {
        return entryRepository.findAll();
    }

    @Override
    public Optional<Entry> getEntryById(Long id) {
        return entryRepository.findById(id);
    }

    @Override
    public Entry createEntry(Entry entry) {
        entry.setCreatedAt(LocalDateTime.now());
        entry.setUpdatedAt(LocalDateTime.now());
        return entryRepository.save(entry);
    }

    @Override
    public Entry updateEntry(Long id, Entry entryDetails) {
        Optional<Entry> existingEntry = entryRepository.findById(id);
        if (existingEntry.isPresent()) {
            Entry entry = existingEntry.get();
            entry.setNameEntry(entryDetails.getNameEntry());
            entry.setDescriptionEntry(entryDetails.getDescriptionEntry());
            entry.setUpdatedAt(LocalDateTime.now());
            return entryRepository.save(entry);
        } else {
            return null;
        }
    }

    @Override
    public void deleteEntry(Long id) {
        entryRepository.deleteById(id);
    }

    @Override
    public List<Entry> getEntriesByUserId(Long userId) {
        return entryRepository.findByUserId(userId);
    }

    @Override
    public List<Entry> getEntriesByJamId(Long jamId) {
        return entryRepository.findByJamId(jamId);
    }
}
