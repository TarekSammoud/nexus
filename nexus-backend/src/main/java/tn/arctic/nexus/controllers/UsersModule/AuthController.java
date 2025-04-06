package tn.arctic.nexus.controllers.UsersModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.User;
import tn.arctic.nexus.services.UsersModule.UserService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200")  // Permettre l'accès à partir de votre front-end Angular
public class AuthController {

    @Autowired
    private UserService userService;

    // Endpoint pour gérer l'authentification
    @PostMapping("/login")
    public User login(@RequestParam String email, @RequestParam String password) {
        // Utilisation du service UserService pour authentifier l'utilisateur
        User user = userService.authenticateUser(email, password);

        if (user != null) {
            // Authentification réussie
            return user;  // Retourner l'utilisateur authentifié (vous pouvez ajouter plus d'informations ici, comme un JWT)
        } else {
            // Authentification échouée
            return null;  // Vous pouvez retourner une réponse d'erreur plus spécifique si nécessaire
        }
    }
}
