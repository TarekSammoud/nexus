package tn.arctic.nexus.controllers.UsersModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.arctic.nexus.entities.ProfilePictures;
import tn.arctic.nexus.entities.User;
import tn.arctic.nexus.repositories.UsersModule.IProfilePicturesRepository;
import tn.arctic.nexus.services.UsersModule.UserService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/pic")
public class ProfilePictureController  {

    @Autowired
    private IProfilePicturesRepository profilePicturesRepository;  // Injection du repository

    @Autowired
    private UserService userService;  // Injection du service utilisateur
/*

    @PostMapping(value = "/uploadProfilePicture/{userId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadProfilePicture(
            @PathVariable Long userId,
            @RequestPart("file") MultipartFile file) {

        // Vérifier si l'utilisateur existe
        User user = userService.retrieveUser(userId);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        try {
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get("uploads").resolve(fileName);

            // Sauvegarde physique de l'image
            Files.createDirectories(filePath.getParent()); // Crée le dossier s'il n'existe pas
            Files.write(filePath, file.getBytes());

            // Sauvegarde en base de données
            ProfilePictures profilePicture = new ProfilePictures();
            profilePicture.setImageUrl(filePath.toString());
            profilePicture.setFileType(file.getContentType());
            profilePicture.setFileSize(file.getSize());
            profilePicture.setUser(user);

            profilePicturesRepository.save(profilePicture);
            return ResponseEntity.ok("Profile picture uploaded successfully");

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading profile picture");
        }
    }


    // Méthode pour récupérer la photo de profil d'un utilisateur
    @GetMapping("/profile-picture/{userId}")
    public ResponseEntity<ProfilePictures> getProfilePicture(@PathVariable Long userId) {
        ProfilePictures profilePicture = profilePicturesRepository.findByUserId(userId);
        if (profilePicture == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(profilePicture);
    }*/
}
