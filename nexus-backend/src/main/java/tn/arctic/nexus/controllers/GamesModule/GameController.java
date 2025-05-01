package tn.arctic.nexus.controllers.GamesModule;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.Game;
import tn.arctic.nexus.entities.GameCategory;
import tn.arctic.nexus.entities.GamePlatform;
import tn.arctic.nexus.services.GamesModule.IGameService;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;
import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.JSchException;
import java.io.InputStream;

import java.io.IOException;
import java.util.List;

@Tag(name = "Game Management")
@CrossOrigin(origins = "http://nexus-frontend.frontend.svc.cluster.local:4200")
@RestController
@RequestMapping("/games")
public class GameController {
    @Autowired
    IGameService gameService;

    @PostMapping("/add-game")
    public Game addGame(@RequestBody Game game){
        return gameService.addGame(game);
    }

    @Operation(description = "get all games from database")
    @GetMapping("/all-games")
    public List<Game> getAllGames(){
        return  gameService.getAllGames();
    }


    @Operation(description = "get all games from database")
    @GetMapping("/all-games/{id}")
    public List<Game> allDeveloperGames(@PathVariable("id") Long id)
    {
        return  gameService.findDeveloperGames(id);
    }

    @GetMapping("/all-browser-games")
    public List<Game> getAllBrowserGames(){
        return  gameService.getBrowserGames();
    }

    @GetMapping("/all-emulated-games")
    public List<Game> getAllEmulatedGames(){
        return  gameService.getEmulatedGames();
    }

    @GetMapping("/{id}")
    public Game getGameById(@PathVariable("id") Long id){
        return gameService.getGameById(id);
    }

    @GetMapping("/filter-by-categories")
    public List<Game> getAllGamesByCategory(@RequestBody List<GameCategory> gameCategories)
    {
        return gameService.getAllGamesByCategory(gameCategories);
    }

    @GetMapping("/filter-by-category/{name}")
    public List<Game> getAllGamesBySingleCategory(@PathVariable("name") String name)
    {
        return gameService.getAllGamesBySingleCategory(name);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteGameById(@PathVariable("id")Long id){
        gameService.deleteGameById(id);
    }

    @PutMapping("/update-game")
    public Game updateGame(@RequestBody Game game){
        return gameService.updateGame(game);
    }

    @GetMapping("/number-of-games")
    public Integer getNumberOfGames(){
        return gameService.getNumberOfGames();
    }
    @GetMapping("/last-id")
    public Long getLastId(){

        Game game = gameService.getLastId();
        if (game!=null)
        return game.getId();
        Long id = 0L;
        return id;
    }

    @PostMapping("/emulated/launch")
    public ResponseEntity<String> launchGame(@RequestParam String romName) {
        String remoteHost = "192.168.83.130"; // Remote machine IP
        String user = "nexus-emu"; // SSH username
        String password = "123456789"; // SSH password
        String remoteScriptPath = "/home/nexus-emu/launch_game.sh";

        try {
            JSch jsch = new JSch();
            Session session = jsch.getSession(user, remoteHost, 22); // 22 is the default SSH port
            session.setPassword(password);

            // Disable strict host key checking (not recommended for production)
            session.setConfig("StrictHostKeyChecking", "no");

            // Connect to the remote machine
            session.connect();

            // Create an SSH channel to execute the script
            Channel channel = session.openChannel("exec");
            ((ChannelExec) channel).setCommand(remoteScriptPath + " " + romName);

            // Get the input stream to read the output of the command
            InputStream inputStream = channel.getInputStream();

            // Start the command
            channel.connect();

            // Read the command output (optional)
            byte[] buffer = new byte[1024];
            while (true) {
                while (inputStream.available() > 0) {
                    int i = inputStream.read(buffer, 0, 1024);
                    if (i < 0) {
                        break;
                    }
                    //System.out.print(new String(buffer, 0, i));
                }
                if (channel.isClosed()) {
                    if (inputStream.available() > 0) continue;
                    break;
                }
            }

            // Disconnect the channel and session after use
            channel.disconnect();
            session.disconnect();

            // Return noVNC URL
            String vncUrl = "http://192.168.83.130:6080/vnc.html";
            return ResponseEntity.ok(vncUrl);

        } catch (JSchException | IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to launch game");
        }
    }



    @PostMapping("/emulated/launch/psp")
    public ResponseEntity<String> launchPSPGame(@RequestParam String romName) {
        String remoteHost = "192.168.83.130"; // Remote machine IP
        String user = "nexus-emu"; // SSH username
        String password = "123456789"; // SSH password
        String remoteScriptPath = "/home/nexus-emu/launch_game_psp.sh";

        try {
            JSch jsch = new JSch();
            Session session = jsch.getSession(user, remoteHost, 22); // 22 is the default SSH port
            session.setPassword(password);

            // Disable strict host key checking (not recommended for production)
            session.setConfig("StrictHostKeyChecking", "no");

            // Connect to the remote machine
            session.connect();

            // Create an SSH channel to execute the script
            Channel channel = session.openChannel("exec");
            ((ChannelExec) channel).setCommand(remoteScriptPath + " " + romName);

            // Get the input stream to read the output of the command
            InputStream inputStream = channel.getInputStream();

            // Start the command
            channel.connect();

            // Read the command output (optional)
            byte[] buffer = new byte[1024];
            while (true) {
                while (inputStream.available() > 0) {
                    int i = inputStream.read(buffer, 0, 1024);
                    if (i < 0) {
                        break;
                    }
                    //System.out.print(new String(buffer, 0, i));
                }
                if (channel.isClosed()) {
                    if (inputStream.available() > 0) continue;
                    break;
                }
            }

            // Disconnect the channel and session after use
            channel.disconnect();
            session.disconnect();

            // Return noVNC URL
            String vncUrl = "http://192.168.83.130:6080/vnc.html";
            return ResponseEntity.ok(vncUrl);

        } catch (JSchException | IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to launch game");
        }
    }


}
