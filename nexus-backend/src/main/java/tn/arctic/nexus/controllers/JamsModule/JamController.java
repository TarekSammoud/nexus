package tn.arctic.nexus.controllers.JamsModule;

import org.springframework.http.HttpStatus;
import org.springframework.web.multipart.MultipartFile;
import tn.arctic.nexus.entities.Jam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.services.JamsModule.IJamService;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/gamejams")
@CrossOrigin(origins = "http://nexus-frontend.frontend.svc.cluster.local:4200")

public class JamController {

    @Autowired
    IJamService jamService;

    private static final String UPLOAD_DIR = "uploads/";

    @GetMapping("/all")
    public List<Jam> getAllJams() {
        return jamService.getAllJams();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Jam> getJamById(@PathVariable Long id) {
        Optional<Jam> jam = jamService.getJamById(id);
        return jam.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<Jam> createJam(@RequestBody Jam jam) {
        Jam newJam = jamService.createJam(jam);
        return ResponseEntity.ok(newJam);
    }

    @PutMapping("/update")
    public Jam updateJam(@RequestBody Jam jam) {
        return jamService.updateJam(jam);
    }

    @DeleteMapping("/delete/{id}")
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



    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            File uploadDir = new  File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            Path filePath = Paths.get(UPLOAD_DIR + file.getOriginalFilename());
            file.transferTo(filePath);

            String fileUrl = "/uploads/" + file.getOriginalFilename();
            return ResponseEntity.ok(fileUrl);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading file");
        }
    }

}