package tn.arctic.nexus.controllers.UsersModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.arctic.nexus.entities.ProfilePictures;
import tn.arctic.nexus.entities.User;
import tn.arctic.nexus.services.UsersModule.IProfilePicturesService;
import tn.arctic.nexus.services.UsersModule.IUserService;
import tn.arctic.nexus.repositories.UsersModule.IProfilePicturesRepository;

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
        System.out.println("Role received: " + (user.getRole() != null ? user.getRole().toString() : "null"));
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




}
