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
import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/pic")
public class ProfilePictureController  {

    @Autowired
    private IProfilePicturesRepository profilePicturesRepository;  // Injection du repository

    @Autowired
    private UserService userService;  // Injection du service utilisateur

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
            // 🔁 1. Vérifier si une image de profil existe pour l'utilisateur
            ProfilePictures existingPicture = profilePicturesRepository.findByUserId(userId);
            if (existingPicture != null) {
                // Mettre à jour l'image de profil existante
                // Supprimer le fichier physique si un fichier existe déjà
                Path oldPath = Paths.get(existingPicture.getImageUrl());
                Files.deleteIfExists(oldPath);

                // Mettre à jour l'ancienne image avec les nouvelles informations
                String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
                Path filePath = Paths.get("uploads").resolve(fileName);

                Files.createDirectories(filePath.getParent());
                Files.write(filePath, file.getBytes());

                // Mettre à jour l'image de profil dans la base de données
                existingPicture.setImageUrl(filePath.toString());
                existingPicture.setFileType(file.getContentType());
                existingPicture.setFileSize(file.getSize());
                Date now = new Date();
                existingPicture.setUpdatedAt(now);

                // Sauvegarder les modifications
                profilePicturesRepository.save(existingPicture);

                return ResponseEntity.ok("Profile picture updated successfully");

            } else {
                // 🆕 2. Si aucune image n'existe, ajouter une nouvelle image
                String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
                Path filePath = Paths.get("uploads").resolve(fileName);

                Files.createDirectories(filePath.getParent());
                Files.write(filePath, file.getBytes());

                ProfilePictures newPicture = new ProfilePictures();
                newPicture.setImageUrl(filePath.toString());
                newPicture.setFileType(file.getContentType());
                newPicture.setFileSize(file.getSize());
                newPicture.setUser(user);

                // Sauvegarder la nouvelle image
                profilePicturesRepository.save(newPicture);

                return ResponseEntity.ok("Profile picture uploaded successfully");
            }

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading profile picture");
        }
    }


    // Méthode pour récupérer la photo de profil d'un utilisateur
    @GetMapping("/profile-picture/{userId}")
    public ResponseEntity<byte[]> getProfilePicture(@PathVariable Long userId) {
        ProfilePictures profilePicture = profilePicturesRepository.findByUserId(userId);
        if (profilePicture == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        try {
            // Lecture du fichier image
            Path path = Paths.get(profilePicture.getImageUrl());
            byte[] imageBytes = Files.readAllBytes(path);

            // Déterminer le type MIME du fichier (ici on suppose que l'image est en PNG, ajustez selon vos besoins)
            String contentType = profilePicture.getFileType() != null ? profilePicture.getFileType() : "image/jpeg";

            // Retourner l'image en réponse avec le bon content-type
            return ResponseEntity.ok()
                    .contentType(MediaType.valueOf(contentType))
                    .body(imageBytes);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
