package tn.arctic.nexus.controllers.CommunityModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.Streamer;
import tn.arctic.nexus.services.CommunityModule.StreamerService;

import java.util.List;

@RestController
@RequestMapping("/api/streamers")
@CrossOrigin(origins = "http://nexus-frontend.frontend.svc.cluster.local:4200")
public class StreamerController {

    @Autowired
    private StreamerService streamerService;

    @PostMapping
    public Streamer createStreamer(@RequestBody Streamer streamer) {
        return streamerService.createStreamer(streamer);
    }

    @GetMapping
    public List<Streamer> getAllStreamers() {
        return streamerService.getAllStreamers();
    }



    @GetMapping("/{id}")
    public Streamer getStreamerById(@PathVariable Long id) {
        return streamerService.getStreamerById(id);
    }

    @PutMapping("/{id}")
    public Streamer updateStreamer(@PathVariable Long id, @RequestBody Streamer streamer) {
        return streamerService.updateStreamer(id, streamer);
    }

    @DeleteMapping("/{id}")
    public void deleteStreamer(@PathVariable Long id) {
        streamerService.deleteStreamer(id);
    }
}