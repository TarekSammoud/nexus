package tn.arctic.nexus.services.JamsModule;

import tn.arctic.nexus.entities.Entry;
import java.util.List;
import java.util.Optional;

public interface IEntryService {

    List<Entry> getAllEntries();

    Optional<Entry> getEntryById(Long id);

    Entry createEntry(Entry entry);

    Entry updateEntry(Entry entry);

    void deleteEntry(Long id);

    List<Entry> getEntriesByUserId(Long userId);

    List<Entry> getEntriesByJamId(Long jamId);
}