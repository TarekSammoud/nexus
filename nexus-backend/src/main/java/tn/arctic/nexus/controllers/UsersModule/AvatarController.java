package tn.arctic.nexus.controllers.UsersModule;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.AvatarRequestDto;
import tn.arctic.nexus.services.UsersModule.AvatarGenerationService;

import java.util.Map;

@RestController
@RequestMapping("/api/avatar")
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
}
