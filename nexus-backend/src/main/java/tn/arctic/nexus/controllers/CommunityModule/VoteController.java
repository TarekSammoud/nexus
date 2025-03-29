package tn.arctic.nexus.controllers.CommunityModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.Vote;
import tn.arctic.nexus.services.CommunityModule.IVoteService;

@RestController
@RequestMapping("/api/votes")
@CrossOrigin(origins = "http://localhost:4200")
public class VoteController {

    @Autowired
    private IVoteService voteService;

    @PostMapping
    public ResponseEntity<Vote> vote(
            @RequestParam Long sondageId,
            @RequestParam Long userId,
            @RequestParam boolean voteOui
    ) {
        return ResponseEntity.ok(voteService.addVote(sondageId, userId, voteOui));
    }

    @GetMapping("/count-yes/{sondageId}")
    public long countYes(@PathVariable Long sondageId) {
        return voteService.countYesVotes(sondageId);
    }

    @GetMapping("/count-total/{sondageId}")
    public long countTotal(@PathVariable Long sondageId) {
        return voteService.countTotalVotes(sondageId);
    }

    @GetMapping("/has-voted")
    public boolean hasVoted(@RequestParam Long sondageId, @RequestParam Long userId) {
        return voteService.hasUserVoted(sondageId, userId);
    }
}
