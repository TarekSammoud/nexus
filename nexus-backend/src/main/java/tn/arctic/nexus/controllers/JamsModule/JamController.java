package tn.arctic.nexus.controllers.JamsModule;

import tn.arctic.nexus.entities.Jam;
import tn.arctic.nexus.services.JamsModule.IJamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/gamejams")
public class JamController {

    @Autowired
    IJamService jamService;

    @GetMapping
    public List<Jam> getAllJams() {
        return jamService.getAllJams();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Jam> getJamById(@PathVariable Long id) {
        Optional<Jam> jam = jamService.getJamById(id);
        return jam.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Jam> createJam(@RequestBody Jam jam) {
        Jam newJam = jamService.createJam(jam);
        return ResponseEntity.ok(newJam);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Jam> updateJam(@PathVariable Long id, @RequestBody Jam jamDetails) {
        Jam updatedJam = jamService.updateJam(id, jamDetails);
        return updatedJam != null ? ResponseEntity.ok(updatedJam) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJam(@PathVariable Long id) {
        jamService.deleteJam(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}")
    public List<Jam> getJamsByUser(@PathVariable Long userId) {
        return jamService.getJamsByUserId(userId);
    }

    @GetMapping("/starting-after/{date}")
    public ResponseEntity<List<Jam>> getJamsStartingAfter(@PathVariable String date) {
        try {
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            Date parsedDate = formatter.parse(date);
            return ResponseEntity.ok(jamService.getJamsStartingAfter(parsedDate));
        } catch (ParseException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/ongoing-voting")
    public List<Jam> getOngoingVotingJams() {
        return jamService.getOngoingVotingJams();
    }
}
