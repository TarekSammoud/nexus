package tn.arctic.nexus.services.CommunityModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.Sondage;
import tn.arctic.nexus.entities.User;
import tn.arctic.nexus.entities.Vote;
import tn.arctic.nexus.repositories.CommunityModule.SondageRepository;
import tn.arctic.nexus.repositories.CommunityModule.VoteRepository;
import tn.arctic.nexus.repositories.UsersModule.IUserRepository;


@Service
public class VoteService implements IVoteService {

    @Autowired
    private VoteRepository voteRepository;

    @Autowired private SondageRepository sondageRepository;



    @Autowired
    private IUserRepository userRepository;


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
}