package tn.arctic.nexus.services.CommunityModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.Streamer;
import tn.arctic.nexus.repositories.CommunityModule.StreamerRepository;

import java.util.List;

@Service
public class StreamerService implements IStreamerService {

    @Autowired
    private StreamerRepository streamerRepository;

    @Override
    public Streamer createStreamer(Streamer streamer) {
        return streamerRepository.save(streamer);
    }

    @Override
    public List<Streamer> getAllStreamers() {
        return streamerRepository.findAll();
    }



    @Override
    public Streamer getStreamerById(Long id) {
        return streamerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Streamer introuvable"));
    }

    @Override
    public Streamer updateStreamer(Long id, Streamer updatedStreamer) {
        Streamer existing = getStreamerById(id);
        existing.setName(updatedStreamer.getName());
        existing.setPlatform(updatedStreamer.getPlatform());
        existing.setStreamUrl(updatedStreamer.getStreamUrl());
        return streamerRepository.save(existing);
    }

    @Override
    public void deleteStreamer(Long id) {
        streamerRepository.deleteById(id);
    }
}