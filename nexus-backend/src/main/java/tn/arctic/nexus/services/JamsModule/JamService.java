package tn.arctic.nexus.services.JamsModule;
import tn.arctic.nexus.entities.Jam;
import tn.arctic.nexus.repositories.JamsModule.IJamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
public class JamService implements IJamService {

    @Autowired
    private IJamRepository jamRepository;

    @Override
    public List<Jam> getAllJams() {
        return jamRepository.findAll();
    }

    @Override
    public Optional<Jam> getJamById(Long id) {
        return jamRepository.findById(id);
    }

    @Override
    public Jam createJam(Jam jam) {
        jam.setCreatedAt(LocalDateTime.now());
        jam.setUpdatedAt(LocalDateTime.now());
        return jamRepository.save(jam);
    }

    @Override
    public Jam updateJam(Long id, Jam jamDetails) {
        Optional<Jam> existingJam = jamRepository.findById(id);
        if (existingJam.isPresent()) {
            Jam jam = existingJam.get();
            jam.setName(jamDetails.getName());
            jam.setDescription(jamDetails.getDescription());
            jam.setDevStartDate(jamDetails.getDevStartDate());
            jam.setDevEndDate(jamDetails.getDevEndDate());
            jam.setVoteStartDate(jamDetails.getVoteStartDate());
            jam.setVoteEndDate(jamDetails.getVoteEndDate());
            jam.setReward(jamDetails.getReward());
            jam.setUpdatedAt(LocalDateTime.now());
            return jamRepository.save(jam);
        } else {
            return null;
        }
    }

    @Override
    public void deleteJam(Long id) {
        jamRepository.deleteById(id);
    }

    @Override
    public List<Jam> getJamsByUserId(Long userId) {
        return jamRepository.findByUserId(userId);
    }

    @Override
    public List<Jam> getJamsStartingAfter(LocalDateTime date) {
        return jamRepository.findByDevStartDateAfter(date);
    }

    @Override
    public List<Jam> getOngoingVotingJams() {
        LocalDateTime now = LocalDateTime.now();
        return jamRepository.findByVoteStartDateBeforeAndVoteEndDateAfter(now, now);
    }
}

