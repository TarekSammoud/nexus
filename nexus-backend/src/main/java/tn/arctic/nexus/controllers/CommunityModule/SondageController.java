package tn.arctic.nexus.controllers.CommunityModule;

        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.http.HttpStatus;
        import org.springframework.http.ResponseEntity;
        import org.springframework.web.bind.annotation.*;
        import tn.arctic.nexus.entities.Sondage;
        import tn.arctic.nexus.entities.Streamer;
        import tn.arctic.nexus.repositories.CommunityModule.SondageRepository;
        import tn.arctic.nexus.services.CommunityModule.EmailService;
        import tn.arctic.nexus.services.CommunityModule.ISondageService;
        import tn.arctic.nexus.services.CommunityModule.VoteService;

        import java.time.LocalDateTime;
        import java.time.format.DateTimeParseException;
        import java.util.List;
        import java.util.Map;
        import java.util.Optional;

@RestController
@RequestMapping("/api/sondages")
@CrossOrigin(origins = "http://localhost:4200")
public class SondageController {

    @Autowired
    private ISondageService sondageService;
    @Autowired

    private SondageRepository sondageRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private VoteService voteService;

    @PostMapping("/create")
    public ResponseEntity<Sondage> create(@RequestBody Sondage sondage) {
        return ResponseEntity.ok(sondageService.createSondage(sondage));
    }

    @GetMapping
    public List<Sondage> getAll() {
        return sondageService.getAllSondages();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sondage> getById(@PathVariable Long id) {
        return sondageService.getSondageById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        sondageService.deleteSondage(id);
    }



    @PutMapping("/approve/{id}")
    public ResponseEntity<?> approveSondage(@PathVariable Long id, @RequestBody Map<String, String> body) {
        try {
            Optional<Sondage> sondageOpt = sondageRepository.findById(id);
            if (sondageOpt.isEmpty()) {
                return ResponseEntity.status(404).body(Map.of("message", "Sondage non trouvé"));
            }

            Sondage sondage = sondageOpt.get();
            sondage.setApproved(true);

            if (body.containsKey("endDate")) {
                String rawDate = body.get("endDate");
                try {
                    // Accepter les dates avec ou sans secondes
                    if (rawDate.length() == 16) { // Format YYYY-MM-DDThh:mm
                        rawDate += ":00"; // Ajouter les secondes
                    }
                    sondage.setEndDate(LocalDateTime.parse(rawDate));
                } catch (DateTimeParseException e) {
                    return ResponseEntity.status(400).body(Map.of("message", "Format de date invalide"));
                }
            }

            sondageRepository.save(sondage);

            // Envoi d'email de confirmation
            try {
                String subject = "Votre sondage a été approuvé";
                String content = "Bonjour,\n\nVotre sondage \"" + sondage.getStreamer() + "\" a été approuvé avec succès.\n"
                        + "Il sera maintenant visible par tous les utilisateurs.\n\n"
                        + "Date de fin: " + sondage.getEndDate() + "\n\n"
                        + "Cordialement,\nL'équipe de modération";

                emailService.sendSimpleEmail(
                        "design.freelance2000@gmail.com", // Destinataire
                        subject,
                        content
                );
            } catch (Exception emailEx) {
                System.err.println("Erreur lors de l'envoi de l'email: " + emailEx.getMessage());
                // On ne bloque pas le processus même si l'email échoue
            }

            return ResponseEntity.ok(Map.of("message", "Sondage approuvé avec succès et notification envoyée"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("message", "Erreur interne : " + e.getMessage()));
        }
    }





    @PutMapping("/{id}/start-live")
    public ResponseEntity<Sondage> startLive(@PathVariable Long id, @RequestBody String liveUrl) {
        Sondage updated = sondageService.startLive(id, liveUrl);
        return ResponseEntity.ok(updated);
    }



    @GetMapping("/top-streamers")
    public ResponseEntity<List<Streamer>> getTopStreamers() {
        List<Streamer> topStreamers = voteService.getTopStreamers();
        if (topStreamers.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); // Aucun top streamer trouvé
        }
        return ResponseEntity.ok(topStreamers);
    }

}