package tn.arctic.nexus.controllers.FinanceModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.FinanceModule.Reward;
import tn.arctic.nexus.services.FinanceModule.RewardService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("reward")
public class RewardController {

    @Autowired
    RewardService rewardService;

    @GetMapping("getAll")
    public List<Reward> getAll() {
        return rewardService.getRewards();
    }

    @GetMapping("{id}")
    public Reward getRewardById(@PathVariable Long id) {
        return rewardService.getReward(id);
    }

    @PostMapping("create")
    public Reward createReward(@RequestBody Reward reward) {
        return rewardService.addReward(reward);
    }

    @PutMapping("update")
    public Reward updateReward(@RequestBody Reward reward) {
        return rewardService.updateReward(reward);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteReward(@PathVariable Long id) {
        boolean flag = rewardService.deleteReward(id);
        if (flag) {
            return ResponseEntity.ok("Deleted reward");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reward not found"); // Return 404 with message
    }
}
