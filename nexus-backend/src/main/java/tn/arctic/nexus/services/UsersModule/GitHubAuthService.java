package tn.arctic.nexus.services.UsersModule;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import tn.arctic.nexus.entities.RoleType;
import tn.arctic.nexus.entities.User;
import tn.arctic.nexus.repositories.UsersModule.IUserRepository;


@Service
@RequiredArgsConstructor
public class GitHubAuthService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final IUserRepository userRepository;

    private final String clientId = "Ov23li0qwXhIrPaTVfkg"; // Client ID GitHub
    private final String clientSecret = "7f0d71b6484a0f961a0148fc770827dd10d81d3e"; // Client Secret GitHub
    private static final String REDIRECT_URI = "http://nexus-frontend.frontend.svc.cluster.local:4200/github-callback"; // URI de redirection

    /**
     * Authentifie l'utilisateur avec GitHub en utilisant le code d'autorisation
     * @param code Le code d'autorisation GitHub
     * @return L'utilisateur authentifié ou créé à partir de GitHub
     */
    public User authenticateWithGitHub(String code) throws Exception {
        System.out.println("Authentification via GitHub démarrée...");
        System.out.println("Code GitHub reçu: " + code);

        // Construire l'URL pour obtenir un token d'accès à partir du code
        String tokenUrl = "https://github.com/login/oauth/access_token";
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(tokenUrl)
                .queryParam("client_id", clientId)
                .queryParam("client_secret", clientSecret)
                .queryParam("code", code)
                .queryParam("redirect_uri", REDIRECT_URI);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", "application/json"); // Accepter la réponse en JSON
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // Requête pour récupérer le token d'accès
        ResponseEntity<String> response = restTemplate.exchange(uriBuilder.toUriString(), HttpMethod.POST, entity, String.class);

        // Vérifier la réussite de la réponse
        if (response.getStatusCode().is2xxSuccessful()) {
            String responseBody = response.getBody();
            System.out.println("Réponse reçue pour l'échange de code contre jeton: " + responseBody);
            String accessToken = extractAccessToken(responseBody);
            System.out.println("Token d'accès récupéré: " + accessToken);

            // Utiliser le token d'accès pour récupérer les informations de l'utilisateur depuis GitHub
            User githubUser = fetchGitHubUserInfo(accessToken);
            System.out.println("Utilisateur GitHub récupéré : " + githubUser.getFirstName());

            // Créer ou récupérer un utilisateur dans notre base de données
            User user = new User();
            user.setEmail(githubUser.getEmail());
            user.setFirstName(githubUser.getFirstName());
            user.setRoleType(RoleType.PLAYER); // Définir le rôle utilisateur (peut être ajusté)

            // Vérifier si l'utilisateur existe déjà
            User existingUser = userRepository.findByEmail(githubUser.getEmail());
            if (existingUser == null) {
                System.out.println("Nouvel utilisateur - Enregistrement en base.");
                user = userRepository.save(user); // Enregistrement du nouvel utilisateur
            } else {
                System.out.println("Utilisateur existant trouvé : " + existingUser.getEmail());
                user = existingUser; // Retourner l'utilisateur existant
            }

            // Maintenant, l'utilisateur est enregistré, et vous pouvez obtenir son ID pour générer le token
            System.out.println("ID de l'utilisateur : " + user.getId());

            return user; // Retourner l'utilisateur pour la génération du token
        } else {
            System.out.println("Erreur dans la réponse GitHub, code de statut: " + response.getStatusCode());
            throw new Exception("Échec de l'échange du code GitHub contre un jeton.");
        }
    }

    /**
     * Récupère les informations de l'utilisateur GitHub en utilisant le token d'accès
     * @param accessToken Le token d'accès GitHub
     * @return L'objet User contenant les informations de l'utilisateur GitHub
     */
    private User fetchGitHubUserInfo(String accessToken) {
        String userInfoUrl = "https://api.github.com/user";
        System.out.println("Récupération des informations de l'utilisateur GitHub à partir de: " + userInfoUrl);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.set("Accept", "application/json");
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(userInfoUrl, HttpMethod.GET, entity, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            String responseBody = response.getBody();
            System.out.println("Réponse GitHub reçue avec succès: " + responseBody);
            JsonNode jsonNode = parseJson(responseBody);
            User githubUser = new User();
            githubUser.setEmail(jsonNode.get("email").asText());
            githubUser.setFirstName(jsonNode.get("login").asText()); // Utilisateur GitHub (username)
            return githubUser;
        }

        System.out.println("Erreur dans la récupération des informations GitHub, code de statut: " + response.getStatusCode());
        throw new RuntimeException("Impossible de récupérer les informations de l'utilisateur GitHub");
    }


    /**
     * Extrait le jeton d'accès à partir de la réponse GitHub
     * @param responseBody Le corps de la réponse GitHub
     * @return Le jeton d'accès
     */
    private String extractAccessToken(String responseBody) {
        JsonNode jsonNode = parseJson(responseBody);
        String accessToken = jsonNode.get("access_token").asText();
        System.out.println("Token d'accès extrait: " + accessToken);
        return accessToken;
    }

    /**
     * Analyse la réponse JSON
     * @param responseBody Le corps de la réponse JSON
     * @return L'objet JsonNode
     */
    private JsonNode parseJson(String responseBody) {
        try {
            return objectMapper.readTree(responseBody);
        } catch (Exception e) {
            System.out.println("Erreur lors de l'analyse de la réponse JSON: " + e.getMessage());
            throw new RuntimeException("Erreur lors de l'analyse de la réponse JSON", e);
        }
    }
}
