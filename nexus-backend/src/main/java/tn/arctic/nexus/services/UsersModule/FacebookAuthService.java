package tn.arctic.nexus.services.UsersModule;

import com.restfb.DefaultFacebookClient;
import com.restfb.FacebookClient;
import com.restfb.Version;
import com.restfb.types.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.RoleType;
import tn.arctic.nexus.repositories.UsersModule.IUserRepository;

@Service
public class FacebookAuthService {
    @Autowired
    private IUserRepository userRepository;

    private String facebookAppSecret = "a8aa214d032662b511448287d3782eee"; // Remplacer par ta clé secrète
    private String facebookAppId = "1021564546008110"; // Remplacer par ton ID d'application

    /**
     * Vérifie l'authentification via Facebook en utilisant l'accessToken
     * @param accessToken Le token d'accès Facebook
     * @return L'utilisateur authentifié depuis Facebook
     */
    /**
     * Authentifie l'utilisateur avec Facebook en utilisant l'accessToken
     * @param accessToken Le token d'accès Facebook
     * @return L'utilisateur authentifié de notre propre entité User
     */
    public tn.arctic.nexus.entities.User authenticateWithFacebook(String accessToken) {
        //System.out.println("Authentification via Facebook démarrée...");
        FacebookClient facebookClient = new DefaultFacebookClient(accessToken, facebookAppSecret, Version.LATEST);

        User fbUser = facebookClient.fetchObject("me", User.class);
        //System.out.println("Utilisateur Facebook récupéré : " + fbUser.getName() + " | Email: " + fbUser.getEmail());

        tn.arctic.nexus.entities.User user = new tn.arctic.nexus.entities.User();
        user.setEmail(fbUser.getEmail());
        user.setFirstName(fbUser.getName());
        user.setRoleType(RoleType.PLAYER); // 🔥 VÉRIFIE ICI

        //System.out.println("Nouvel utilisateur à sauvegarder : " + user.getEmail() + " | RoleType: " + user.getRoleType());

        tn.arctic.nexus.entities.User existingUser = userRepository.findByEmail(fbUser.getEmail());
        if (existingUser == null) {
            //System.out.println("Nouvel utilisateur - Enregistrement en base.");
            return userRepository.save(user);
        }

        //System.out.println("Utilisateur existant trouvé : " + existingUser.getEmail() + " | RoleType: " + existingUser.getRoleType());
        return existingUser;
    }

    /**
     * Vérifie la validité du token Facebook
     * @param accessToken Le token d'accès
     * @return true si le token est valide
     */
    public boolean isValidFacebookToken(String accessToken) {
        try {
            // Créer un client Facebook pour valider le token
            FacebookClient facebookClient = new DefaultFacebookClient(accessToken, facebookAppSecret, Version.LATEST);
            facebookClient.fetchObject("me", User.class); // Si ça fonctionne, le token est valide
            return true;
        } catch (Exception e) {
            return false; // Si une exception est levée, le token est invalide
        }
    }
}
