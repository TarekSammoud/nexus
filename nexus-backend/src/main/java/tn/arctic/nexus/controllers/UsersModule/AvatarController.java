package tn.arctic.nexus.controllers.UsersModule;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.AvatarRequestDto;
import tn.arctic.nexus.services.UsersModule.AvatarGenerationService;
import java.io.File;
import java.nio.file.Path;
import java.util.Map;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.*;

@RestController
@RequestMapping("/api/avatar")
@CrossOrigin(origins = "http://nexus-frontend.frontend.svc.cluster.local:4200")

public class AvatarController {

    private final AvatarGenerationService avatarService;

    public AvatarController(AvatarGenerationService avatarService) {
        this.avatarService = avatarService;
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> generateAvatar(@Valid @RequestBody AvatarRequestDto request) {
        String imageUrl = avatarService.generateAvatar(request);
        return ResponseEntity.ok(Map.of("image", imageUrl));
    }

    @GetMapping("/latest")
    public ResponseEntity<Resource> getLatestAvatar() {
        try {
            // Assume that the file path will be dynamic based on the last generated image
            File file = new File("../../stable-diffusion/output1.png"); // 🔁 chemin relatif ou dynamique
            Path path = file.toPath().toAbsolutePath();

            if (!path.toFile().exists()) {
                return ResponseEntity.notFound().build(); // Image not found
            }

            Resource resource = new UrlResource(path.toUri());

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_PNG);

            return new ResponseEntity<>(resource, headers, HttpStatus.OK);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

}
