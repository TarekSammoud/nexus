package tn.arctic.nexus.controllers.UsersModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import tn.arctic.nexus.services.UsersModule.CloudinaryUploadService;
import tn.arctic.nexus.services.UsersModule.FaceAnimerService;

import java.io.IOException;

@RestController
@RequestMapping("/api/face-animer")
public class FaceAnimerController {

    @Autowired
    private CloudinaryUploadService cloudinaryUploadService;

    @Autowired
    private FaceAnimerService faceAnimerService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadAvatarAndAnimate(@RequestParam("file") MultipartFile file) {
        try {
            // Upload to Cloudinary
            String imageUrl = cloudinaryUploadService.uploadFile(file);

            // Submit to Face-Animer
            String faceAnimerResponse = faceAnimerService.submitTaskByUrl(imageUrl);

            return ResponseEntity.ok(faceAnimerResponse);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Erreur: " + e.getMessage());
        }
    }


    @GetMapping("/task-info/{taskId}")
    public ResponseEntity<String> getTaskInfo(@PathVariable String taskId) {
        try {
            String result = faceAnimerService.getTaskInfo(taskId);
            return ResponseEntity.ok(result);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error while fetching task info: " + e.getMessage());
        }
    }

    @GetMapping("/submit-url")
    public ResponseEntity<String> submitTaskByUrl(@RequestParam String imageUrl) {
        try {
            String result = faceAnimerService.submitTaskByUrl(imageUrl);
            return ResponseEntity.ok(result);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error while submitting task by URL: " + e.getMessage());
        }
    }
}
