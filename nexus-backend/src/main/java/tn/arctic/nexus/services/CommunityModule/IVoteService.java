package tn.arctic.nexus.services.CommunityModule;

import tn.arctic.nexus.entities.Vote;

public interface IVoteService {

    Vote addVote(Long sondageId, Long userId, boolean voteOui);
    long countYesVotes(Long sondageId);
    long countTotalVotes(Long sondageId);
    boolean hasUserVoted(Long sondageId, Long userId);
}
