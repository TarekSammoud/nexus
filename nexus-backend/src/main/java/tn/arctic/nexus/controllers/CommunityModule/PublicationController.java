package tn.arctic.nexus.controllers.CommunityModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import tn.arctic.nexus.entities.Publication;
import tn.arctic.nexus.services.CommunityModule.PublicationService;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

import java.util.List;


@CrossOrigin(origins = "http://localhost:4200")

@RestController
@RequestMapping("/api/publications")
public class PublicationController {

    @Autowired
    private PublicationService publicationService;


    @Autowired
    private RestTemplate restTemplate;


    private static final String UPLOAD_DIR = "uploads/";



    @PostMapping
    public Publication createPublication(@RequestBody Publication publication) {
        if (publication.getCategory() == null) {
            throw new IllegalArgumentException("Publication must reference an existing category");
        }

        if (!isAcceptable(publication.getContent())) {
            throw new IllegalArgumentException("❌ Contenu inapproprié détecté par l'IA");
        }
        if (!isAcceptable(publication.getTitle())) {
            throw new IllegalArgumentException("❌ titre inapproprié détecté par l'IA");
        }

        return publicationService.createPublication(publication);
    }


    @GetMapping("/all")
    public List<Publication> getAllPublications() {

        return publicationService.getAllPublicationsSorted();
    }

    @GetMapping("/{id}")
    public Publication getPublicationById(@PathVariable Long id) {
        return publicationService.getPublicationById(id)
                .orElseThrow(() -> new RuntimeException("Publication not found"));

    }

    @PutMapping("/{id}")
    public Publication updatePublication(@PathVariable Long id, @RequestBody Publication updatedPublication) {
        return publicationService.updatePublication(id, updatedPublication);
    }

    @DeleteMapping("/{id}")
    public void deletePublication(@PathVariable Long id) {
        publicationService.deletePublication(id);
    }


    @GetMapping("/visibles")
    public ResponseEntity<List<Publication>> getPublicationsVisibles() {
        return ResponseEntity.ok(publicationService.getPublicationsVisibles());
    }





    public boolean isAcceptable(String content) {
        String url = "http://localhost:8000/predict";

        Map<String, String> body = new HashMap<>();
        body.put("text", content);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(url, body, Map.class);
            return Boolean.TRUE.equals(response.getBody().get("acceptable"));
        } catch (Exception e) {
            e.printStackTrace();
            return true; // accepte par défaut si l’IA ne répond pas
        }
    }


    @GetMapping("/stats/category")
    public ResponseEntity<Map<String, Long>> getStatsByCategory() {
        return ResponseEntity.ok(publicationService.countPublicationsByCategory());
    }


    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            if (!file.getContentType().startsWith("image/")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Veuillez télécharger une image valide.");
            }

            Path filePath = Paths.get(UPLOAD_DIR + file.getOriginalFilename());
            file.transferTo(filePath);

            String fileUrl = "/uploads/" + file.getOriginalFilename();
            return ResponseEntity.ok(fileUrl);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de l'upload de l'image");
        }
    }

}
