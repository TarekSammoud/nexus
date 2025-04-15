package tn.arctic.nexus.controllers.GamesModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.Config.JwtUtil;
import tn.arctic.nexus.entities.Game;
import tn.arctic.nexus.entities.User;
import tn.arctic.nexus.repositories.GamesModule.IGameRepository;
import tn.arctic.nexus.repositories.UsersModule.IUserRepository;
import tn.arctic.nexus.services.UsersModule.AuthService;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/games/library")
public class LibraryController {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IGameRepository gameRepository;

    private final JwtUtil jwtUtil;
    @Lazy
    private final AuthService authService;
    public LibraryController(JwtUtil jwtUtil, @Lazy AuthService authService) {
        this.jwtUtil = jwtUtil;
        this.authService = authService;
    }

    @PostMapping("/add/{gameId}")
    public ResponseEntity<?> addGameToLibrary(@PathVariable Long gameId, @RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        Long userId = jwtUtil.extractUserId(token); // Custom method to extract ID

        Optional<User> userOpt = userRepository.findById(userId);
        Optional<Game> gameOpt = gameRepository.findById(gameId);

        if (userOpt.isPresent() && gameOpt.isPresent()) {
            User user = userOpt.get();
            Game game = gameOpt.get();
            user.getGameLibrary().add(game);
            userRepository.save(user);
            return ResponseEntity.ok("Game added to library");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or Game not found");
    }

    @GetMapping
    public ResponseEntity<?> getUserGameLibrary(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        Long userId = jwtUtil.extractUserId(token); // extract "id" from token

        Optional<User> userOpt = userRepository.findById(userId);

        if (userOpt.isPresent()) {
            List<Game> gameLibrary = userOpt.get().getGameLibrary();
            return ResponseEntity.ok(gameLibrary);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }
}
