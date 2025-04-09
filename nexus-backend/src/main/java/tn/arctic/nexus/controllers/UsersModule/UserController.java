package tn.arctic.nexus.controllers.UsersModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.arctic.nexus.entities.FriendRequest;
import tn.arctic.nexus.entities.ProfilePictures;
import tn.arctic.nexus.entities.StatusFriendRequest;
import tn.arctic.nexus.entities.User;
import tn.arctic.nexus.repositories.UsersModule.IFriendRequestRepository;
import tn.arctic.nexus.repositories.UsersModule.IUserRepository;
import tn.arctic.nexus.services.UsersModule.IProfilePicturesService;
import tn.arctic.nexus.services.UsersModule.IUserService;
import tn.arctic.nexus.repositories.UsersModule.IProfilePicturesRepository;

import java.util.ArrayList;
import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private IUserService userService;

    @Autowired
    private IProfilePicturesService profilePictureService;


    @GetMapping("/allUser")
    public List<User> getAllUsers() {
        return userService.retrieveAllUser();
    }

    @PostMapping("/addUser")
    public User addUser(@RequestBody User user) {
        System.out.println("User received: " + user.toString());
        return userService.addUser(user);
    }

    @PutMapping("/updateUser")
    public User updateUser(@RequestBody User user) {
        return userService.updateUser(user);
    }

    @GetMapping("/getbyid/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.retrieveUser(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.removeUser(id);
    }

    @GetMapping("/test")
    public String test() {
        return "Application is running";
    }

    @PostMapping("/login")
    public User login(@RequestParam String email, @RequestParam String password) {
        // Vérifier l'email et le mot de passe
        User user = userService.authenticateUser(email, password);

        if (user != null) {
            return user;  // L'utilisateur est authentifié
        } else {
            throw new RuntimeException("Invalid credentials");  // Mauvais email ou mot de passe
        }
    }

    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private IFriendRequestRepository friendRequestRepository;

    
    @GetMapping("/friends/{userId}")
    public List<User> getFriends(@PathVariable Long userId) {
        // Vérifier que l'utilisateur existe
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Récupérer les demandes d'amis acceptées où l'utilisateur est soit l'envoyeur, soit le destinataire
        List<FriendRequest> friendRequests = friendRequestRepository.findAcceptedFriends(userId, StatusFriendRequest.ACCEPTED);

        // Extraire les autres utilisateurs (les amis) en excluant l'utilisateur actuel
        List<User> friends = new ArrayList<>();
        for (FriendRequest friendRequest : friendRequests) {
            if (friendRequest.getSender().getId() != userId) {
                friends.add(friendRequest.getSender());  // Ajouter l'ami qui est l'envoyeur
            }
            if (friendRequest.getRecipient().getId() != userId) {
                friends.add(friendRequest.getRecipient());  // Ajouter l'ami qui est le destinataire
            }
        }

        return friends;  // Retourner la liste des amis
    }





}
