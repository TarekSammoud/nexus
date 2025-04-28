package tn.arctic.nexus.services.UsersModule;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import tn.arctic.nexus.entities.AvatarRequestDto;

import java.io.File;
import java.io.FileOutputStream;
import java.net.URI;
import java.util.Base64;

@Service
public class AvatarGenerationService {

    private final RestTemplate restTemplate;
    private final String fastApiUrl = "http://127.0.0.1:8000/generate";
    private final CloudinaryService cloudinaryService;

    public AvatarGenerationService(RestTemplateBuilder restTemplateBuilder, CloudinaryService cloudinaryService) {
        this.restTemplate = restTemplateBuilder.build();
        this.cloudinaryService = cloudinaryService;
    }

    public String generateAvatar(AvatarRequestDto request) {
        String fullPrompt = buildPrompt(request);
        URI uri = UriComponentsBuilder.fromHttpUrl(fastApiUrl)
                .queryParam("prompt", fullPrompt)
                .build().encode().toUri();

        try {
            // 🔧 Envoi d'une requête POST correcte (même sans body utile)
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<String> entity = new HttpEntity<>("", headers);

            ResponseEntity<String> response = restTemplate.postForEntity(uri, entity, String.class);
            String base64Image = response.getBody();

            // 🧼 Nettoyage du base64 s'il contient un header data URI
            if (base64Image != null && base64Image.contains(",")) {
                base64Image = base64Image.split(",")[1];
            }

            byte[] imageBytes = Base64.getDecoder().decode(base64Image);


            // 📁 Sauvegarde temporaire de l'image
            File tempFile = File.createTempFile("avatar_", ".png");
            try (FileOutputStream fos = new FileOutputStream(tempFile)) {
                fos.write(imageBytes);

            }

            // ☁️ Upload vers Cloudinary
            String cloudinaryUrl = cloudinaryService.uploadImage(tempFile);

            // 🧹 Nettoyage
            tempFile.delete();

            return cloudinaryUrl;

        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la génération ou l’upload de l’avatar", e);
        }
    }


    private String buildPrompt(AvatarRequestDto request) {
        StringBuilder prompt = new StringBuilder();

        // Ajout du texte de description
        if (request.getDescription() != null && !request.getDescription().isEmpty()) {
            prompt.append(request.getDescription());
        }

        // Ajout du style artistique
        if (request.getArtStyle() != null && !request.getArtStyle().isEmpty()) {
            prompt.append(", style ").append(request.getArtStyle());
        }

        // Ajout des traits faciaux
        if (request.getFacialFeatures() != null && !request.getFacialFeatures().isEmpty()) {
            prompt.append(", ").append(String.join(", ", request.getFacialFeatures()));
        }

        // Ajout du prompt négatif
        if (request.getNegativePrompt() != null && !request.getNegativePrompt().isEmpty()) {
            prompt.append(", avoid: ").append(request.getNegativePrompt());
        }

        return prompt.toString();
    }
}