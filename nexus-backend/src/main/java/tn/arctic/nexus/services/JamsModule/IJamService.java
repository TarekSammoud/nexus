package tn.arctic.nexus.services.JamsModule;

import tn.arctic.nexus.entities.Jam;

import java.util.List;
import java.util.Optional;

public interface IJamService {
    List<Jam> getAllJams();
    Optional<Jam> getJamById(Long id);
    Jam createJam(Jam jam);
    Jam updateJam(Long id, Jam jamDetails);
    void deleteJam(Long id);
    List<Jam> getJamsByUserId(Long userId);
    List<Jam> getJamsStartingAfter(java.time.LocalDateTime date);
    List<Jam> getOngoingVotingJams();
}
