package tn.arctic.nexus.controllers.JamsModule;

import tn.arctic.nexus.entities.Entry;
import tn.arctic.nexus.services.JamsModule.IEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/entries")
public class EntryController {

    @Autowired
    IEntryService entryService;

    @GetMapping("/all")
    public List<Entry> getAllEntries() {
        return entryService.getAllEntries();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Entry> getEntryById(@PathVariable Long id) {
        Optional<Entry> entry = entryService.getEntryById(id);
        return entry.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<Entry> createEntry(@RequestBody Entry entry) {
        Entry newEntry = entryService.createEntry(entry);
        return ResponseEntity.ok(newEntry);
    }

    @PutMapping("/update/{id}")
    public Entry updateEntry( @RequestBody Entry entry) {
        return entryService.updateEntry(entry);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteEntry(@PathVariable Long id) {
        entryService.deleteEntry(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}")
    public List<Entry> getEntriesByUser(@PathVariable Long userId) {
        return entryService.getEntriesByUserId(userId);
    }

    @GetMapping("/jam/{jamId}")
    public List<Entry> getEntriesByJam(@PathVariable Long jamId) {
        return entryService.getEntriesByJamId(jamId);
    }
}