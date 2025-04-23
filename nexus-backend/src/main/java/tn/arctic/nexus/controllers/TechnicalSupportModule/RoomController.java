package tn.arctic.nexus.controllers.TechnicalSupportModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.Message;
import tn.arctic.nexus.entities.RoleType;
import tn.arctic.nexus.entities.Room;
import tn.arctic.nexus.entities.User;
import tn.arctic.nexus.repositories.UsersModule.IUserRepository;
import tn.arctic.nexus.services.TechnicalSupportModule.EmailService;
import tn.arctic.nexus.services.TechnicalSupportModule.MessageService;
import tn.arctic.nexus.services.TechnicalSupportModule.RoomService;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private MessageService messageService;

    @Autowired
    private IUserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(RoomController.class);

    // Créer une room pour un ticket donné
    @PostMapping("/create/{ticketId}")
    public ResponseEntity<String> creerRoom(@PathVariable Long ticketId) {
        try {
            logger.debug("CreerRoom called with ticketId: {}", ticketId);
            // Création de la room sans l'email
            Room room = roomService.creerRoom(ticketId);
            logger.debug("Room created with link: {}", room.getLien());
            emailService.sendVerificationEmail("abdouhanafi090@gmail.com", room.getLien());
            return new ResponseEntity<>("Room créée avec le lien : " + room.getLien(), HttpStatus.CREATED);
        } catch (RuntimeException e) {
            // Gestion des erreurs : Ticket non trouvé ou room déjà existante
            logger.error("Error creating room for ticketId {}: {}", ticketId, e.getMessage());
            return new ResponseEntity<>("Erreur : " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Fermer la room associée à un ticket
    @PostMapping("/close/{ticketId}")
    public ResponseEntity<String> fermerRoom(@PathVariable Long ticketId) {
        try {
            logger.debug("FermerRoom called with ticketId: {}", ticketId);
            roomService.fermerRoom(ticketId);  // Ferme la room
            logger.debug("Room successfully closed for ticketId: {}", ticketId);
            return new ResponseEntity<>("Room fermée avec succès.", HttpStatus.OK);
        } catch (RuntimeException e) {
            // Gestion des erreurs : Room non trouvée pour ce ticket
            logger.error("Error closing room for ticketId {}: {}", ticketId, e.getMessage());
            return new ResponseEntity<>("Erreur : " + e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // Récupérer toutes les rooms
    @GetMapping("/getAll")
    public ResponseEntity<List<Room>> getAllRooms() {
        try {
            logger.debug("Fetching all rooms.");
            List<Room> rooms = roomService.getAllRooms();  // Appelle la méthode dans le service pour obtenir toutes les rooms
            logger.debug("Fetched {} rooms.", rooms.size());
            return new ResponseEntity<>(rooms, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error fetching all rooms: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);  // Si une erreur se produit lors de la récupération des rooms
        }
    }

    // Récupérer les messages d'une room
    @GetMapping("/messages/{roomId}")
    public ResponseEntity<List<Message>> getMessagesByRoom(@PathVariable Long roomId) {
        try {
            logger.debug("Fetching messages for roomId: {}", roomId);
            List<Message> messages = roomService.getMessagesByRoom(roomId);
            if (messages.isEmpty()) {
                logger.warn("No messages found for roomId: {}", roomId);
            } else {
                logger.debug("Found {} messages for roomId: {}", messages.size(), roomId);
            }
            return new ResponseEntity<>(messages, HttpStatus.OK);
        } catch (RuntimeException e) {
            logger.error("Error fetching messages for roomId {}: {}", roomId, e.getMessage());
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Envoyer un message à une room
    @PostMapping("/sendMessage/{roomId}")
    public ResponseEntity<Message> sendMessage(@PathVariable Long roomId, @RequestBody Message message) {
        try {
            logger.debug("Sending message to roomId: {}", roomId);
            String senderName = message.getSendername();
            Long senderId = message.getSenderId();
            String content = message.getContent();
            Long recipientId = message.getRecipientId(); // This could be null or a valid ID

            logger.debug("Sender: {} (ID: {}), Content: {}", senderName, senderId, content);

            // Check if the sender is a support agent
            User sender = userRepository.findById(senderId).orElseThrow(() -> new RuntimeException("User not found"));
            logger.debug("Sender found: {}", sender.getEmail());

            if (sender.getRoleType() != RoleType.SUPPORTAGENT && recipientId == null) {
                // Broadcast message to all connected support agents
                List<User> supportAgents = userRepository.findAllSupportAgents();
                for (User supportAgent : supportAgents) {
                    logger.debug("Sending message to support agent: {}", supportAgent.getEmail());
                    messagingTemplate.convertAndSendToUser(supportAgent.getEmail(), "/queue/chat/" + roomId, message);
                }
            } else if (sender.getRoleType() == RoleType.SUPPORTAGENT && recipientId != null) {
                // Send message to the specific recipient
                User recipient = userRepository.findById(recipientId).orElseThrow(() -> new RuntimeException("Recipient not found"));
                logger.debug("Sending message to recipient: {}", recipient.getEmail());
                messagingTemplate.convertAndSendToUser(recipient.getEmail(), "/queue/chat/" + roomId, message);
            }

            // Save the message in the database
            Message savedMessage = roomService.sendMessageToRoom(roomId, senderName, senderId, content, message.getType());
            logger.debug("Message saved in database: {}", savedMessage);

            messagingTemplate.convertAndSend("/topic/chat/" + roomId, savedMessage);

            return new ResponseEntity<>(savedMessage, HttpStatus.OK);
        } catch (RuntimeException e) {
            logger.error("Error sending message to roomId {}: {}", roomId, e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // Supprimer une room
    @DeleteMapping("/delete/{roomId}")
    public ResponseEntity<String> deleteRoom(@PathVariable Long roomId) {
        try {
            logger.debug("Deleting room with roomId: {}", roomId);
            roomService.deleteRoom(roomId);  // Call the service to delete the room
            logger.debug("Room successfully deleted: {}", roomId);
            return new ResponseEntity<>("Room deleted successfully.", HttpStatus.OK);
        } catch (RuntimeException e) {
            logger.error("Error deleting room with roomId {}: {}", roomId, e.getMessage());
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
