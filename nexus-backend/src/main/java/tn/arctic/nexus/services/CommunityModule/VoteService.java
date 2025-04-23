package tn.arctic.nexus.services.CommunityModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.Sondage;
import tn.arctic.nexus.entities.Streamer;
import tn.arctic.nexus.entities.User;
import tn.arctic.nexus.entities.Vote;
import tn.arctic.nexus.repositories.CommunityModule.SondageRepository;
import tn.arctic.nexus.repositories.CommunityModule.StreamerRepository;
import tn.arctic.nexus.repositories.CommunityModule.VoteRepository;
import tn.arctic.nexus.repositories.UsersModule.IUserRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class VoteService implements IVoteService {

    @Autowired
    private VoteRepository voteRepository;



    @Autowired private SondageRepository sondageRepository;


    @Autowired
    private StreamerRepository streamerRepository;



    @Autowired
    private IUserRepository userRepository;


    public Optional<Sondage> getSondageById(Long id) {
        return sondageRepository.findById(id);
    }


    public Vote addVote(Long sondageId, Long userId, boolean voteOui) {
        if (voteRepository.existsBySondageIdAndUserId(sondageId, userId)) {
            throw new RuntimeException("❌ L'utilisateur a déjà voté pour ce sondage !");
        }

        Sondage sondage = sondageRepository.findById(sondageId)
                .orElseThrow(() -> new RuntimeException("❌ Sondage introuvable"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("❌ Utilisateur introuvable"));

        Vote vote = new Vote();
        vote.setVoteOui(voteOui);
        vote.setSondage(sondage);
        vote.setUser(user);

        return voteRepository.save(vote);
    }



    public long countYesVotes(Long sondageId) {
        return voteRepository.countBySondageIdAndVoteOuiTrue(sondageId);
    }

    public long countTotalVotes(Long sondageId) {
        return voteRepository.countBySondageId(sondageId);
    }

    public boolean hasUserVoted(Long sondageId, Long userId) {
        return voteRepository.existsBySondageIdAndUserId(sondageId, userId);
    }


    public List<Streamer> getTopStreamers() {
        List<Streamer> allStreamers = streamerRepository.findAll();

        // Tri des streamers en fonction du nombre de sondages associés
        allStreamers.sort((s1, s2) -> {
            long count1 = sondageRepository.countByStreamerId(s1.getId());
            long count2 = sondageRepository.countByStreamerId(s2.getId());
            return Long.compare(count2, count1); // Tri par ordre décroissant
        });

        // Limiter aux 3 premiers streamers
        return allStreamers.size() > 3 ? allStreamers.subList(0, 3) : allStreamers;
    }
}


