package tn.arctic.nexus.services.JamsModule;

import tn.arctic.nexus.entities.Jam;
import tn.arctic.nexus.repositories.JamsModule.IJamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
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
        return jamRepository.save(jam);
    }

    @Override
    public Jam updateJam(Jam jam) {
        return jamRepository.save(jam);
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
    public List<Jam> getJamsStartingAfter(Date date) {
        return jamRepository.findByDevStartDateAfter(date);
    }

    @Override
    public List<Jam> getOngoingVotingJams() {
        Date now = new Date();
        return jamRepository.findByVoteStartDateBeforeAndVoteEndDateAfter(now, now);
    }
}