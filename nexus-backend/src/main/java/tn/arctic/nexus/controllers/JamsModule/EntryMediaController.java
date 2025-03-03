package tn.arctic.nexus.controllers.JamsModule;

import tn.arctic.nexus.entities.EntryMedia;
import tn.arctic.nexus.services.JamsModule.IEntryMediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/entry-media")
public class EntryMediaController {

    @Autowired
    IEntryMediaService mediaService;

    @GetMapping
    public List<EntryMedia> getAllMedia() {
        return mediaService.getAllMedia();
    }

    @PostMapping
    public ResponseEntity<EntryMedia> createMedia(@RequestBody EntryMedia media) {
        return ResponseEntity.ok(mediaService.createMedia(media));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedia(@PathVariable Long id) {
        mediaService.deleteMedia(id);
        return ResponseEntity.noContent().build();
    }
}
