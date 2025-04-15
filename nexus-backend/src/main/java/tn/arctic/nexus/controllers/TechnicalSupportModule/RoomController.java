package tn.arctic.nexus.controllers.TechnicalSupportModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.Message;
import tn.arctic.nexus.entities.Room;
import tn.arctic.nexus.services.TechnicalSupportModule.EmailService;
import tn.arctic.nexus.services.TechnicalSupportModule.MessageService;
import tn.arctic.nexus.services.TechnicalSupportModule.RoomService;
import java.util.List;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @Autowired
    private EmailService emailService;

    // Créer une room pour un ticket donné
    @PostMapping("/create/{ticketId}")
    public ResponseEntity<String> creerRoom(@PathVariable Long ticketId) {
        try {
            // Création de la room sans l'email
            System.out.println("creerRoom");
            Room room = roomService.creerRoom(ticketId);
            emailService.sendVerificationEmail("abdouhanafi090@gmail.com", room.getLien());
            return new ResponseEntity<>("Room créée avec le lien : " + room.getLien(), HttpStatus.CREATED);
        } catch (RuntimeException e) {
            // Gestion des erreurs : Ticket non trouvé ou room déjà existante
            return new ResponseEntity<>("Erreur : " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Fermer la room associée à un ticket
    @PostMapping("/close/{ticketId}")
    public ResponseEntity<String> fermerRoom(@PathVariable Long ticketId) {
        try {
            roomService.fermerRoom(ticketId);  // Ferme la room
            return new ResponseEntity<>("Room fermée avec succès.", HttpStatus.OK);
        } catch (RuntimeException e) {
            // Gestion des erreurs : Room non trouvée pour ce ticket
            return new ResponseEntity<>("Erreur : " + e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // Récupérer toutes les rooms
    @GetMapping("/getAll")
    public ResponseEntity<List<Room>> getAllRooms() {
        try {
            List<Room> rooms = roomService.getAllRooms();  // Appelle la méthode dans le service pour obtenir toutes les rooms
            return new ResponseEntity<>(rooms, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);  // Si une erreur se produit lors de la récupération des rooms
        }
    }


    @GetMapping("/messages/{roomId}")
    public ResponseEntity<List<Message>> getMessagesByRoom(@PathVariable Long roomId) {
        try {
            System.out.println("Fetching messages for roomId: " + roomId);
            List<Message> messages = roomService.getMessagesByRoom(roomId);
            return new ResponseEntity<>(messages, HttpStatus.OK);
        } catch (RuntimeException e) {
            System.out.println("Room not found: " + roomId);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/sendMessage/{roomId}")
    public ResponseEntity<Message> sendMessage(
            @PathVariable Long roomId,
            @RequestParam String sender,
            @RequestParam String content) {
        try {
            Message message = roomService.sendMessageToRoom(roomId, sender, content);
            return new ResponseEntity<>(message, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @DeleteMapping("/delete/{roomId}")
    public ResponseEntity<String> deleteRoom(@PathVariable Long roomId) {
        try {
            roomService.deleteRoom(roomId);  // Call the service to delete the room
            return new ResponseEntity<>("Room deleted successfully.", HttpStatus.OK);
        } catch (RuntimeException e) {
            // Handle errors such as room not found
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

}
