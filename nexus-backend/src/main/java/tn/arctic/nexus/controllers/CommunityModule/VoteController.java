package tn.arctic.nexus.controllers.CommunityModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.Sondage;
import tn.arctic.nexus.entities.Vote;
import tn.arctic.nexus.services.CommunityModule.IVoteService;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/api/votes")
@CrossOrigin(origins = "http://localhost:4200")
public class VoteController {

    @Autowired
    private IVoteService voteService;

    @PostMapping
    public ResponseEntity<?> vote(
            @RequestParam Long sondageId,
            @RequestParam Long userId,
            @RequestParam boolean voteOui
    ) {
        Optional<Sondage> sondageOpt = voteService.getSondageById(sondageId); // utilise ton service
        if (sondageOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Sondage sondage = sondageOpt.get();
        if (sondage.getEndDate() != null && sondage.getEndDate().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("🚫 Ce sondage est terminé, vous ne pouvez plus voter.");
        }

        Vote vote = voteService.addVote(sondageId, userId, voteOui);
        return ResponseEntity.ok(vote);
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
