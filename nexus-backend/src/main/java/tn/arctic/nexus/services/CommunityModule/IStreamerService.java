package tn.arctic.nexus.services.CommunityModule;

import tn.arctic.nexus.entities.Streamer;

import java.util.List;

public interface IStreamerService {

    Streamer createStreamer(Streamer streamer);
    List<Streamer> getAllStreamers();
    Streamer getStreamerById(Long id);
    Streamer updateStreamer(Long id, Streamer updatedStreamer);
    void deleteStreamer(Long id);
}

