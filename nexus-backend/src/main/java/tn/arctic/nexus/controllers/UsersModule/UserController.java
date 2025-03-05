package tn.arctic.nexus.controllers.UsersModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.User;
import tn.arctic.nexus.services.UsersModule.IUserService;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private IUserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.retrieveAllUser();
    }

    @PostMapping("add")
    public User addUser(@RequestBody User user) {
        return  userService.addUser(user);
    }

    @PutMapping("update")
    public User updateUser(@RequestBody User user) {
        return userService.updateUser(user);
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.retrieveUser(id);
    }

    @DeleteMapping("delete/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.removeUser(id);
    }
}
