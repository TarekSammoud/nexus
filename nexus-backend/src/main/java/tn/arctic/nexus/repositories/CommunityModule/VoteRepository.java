package tn.arctic.nexus.repositories.CommunityModule;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.arctic.nexus.entities.Vote;

public interface VoteRepository extends JpaRepository<Vote, Long> {
    long countBySondageIdAndVoteOuiTrue(Long sondageId);
    long countBySondageId(Long sondageId);
    boolean existsBySondageIdAndUserId(Long sondageId, Long userId);
}
