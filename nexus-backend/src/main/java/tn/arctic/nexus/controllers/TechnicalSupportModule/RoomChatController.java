package tn.arctic.nexus.controllers.TechnicalSupportModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import tn.arctic.nexus.Config.JwtUtil;
import tn.arctic.nexus.entities.*;
import tn.arctic.nexus.repositories.TechnicalSupportModule.IMessageRepository;
import tn.arctic.nexus.repositories.UsersModule.IUserRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class RoomChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final IUserRepository userRepository;
    private final IMessageRepository messageRepository;
    private final JwtUtil jwtUtil;

    @Autowired
    public RoomChatController(SimpMessagingTemplate messagingTemplate, IUserRepository userRepository, IMessageRepository messageRepository, JwtUtil jwtUtil) {
        this.messagingTemplate = messagingTemplate;
        this.userRepository = userRepository;
        this.messageRepository = messageRepository;
        this.jwtUtil = jwtUtil;
    }

    private User getUserFromToken(String token) {
        Long userId = jwtUtil.extractUserId(token);
        Optional<User> userOptional = userRepository.findById(userId);
        return userOptional.orElse(null);
    }

   /* @MessageMapping("/chat-sendMessage")
    public void sendMessage(@Payload Message message, SimpMessageHeaderAccessor headerAccessor) {
        String token = (String) headerAccessor.getSessionAttributes().get("token");
        System.out.println("Debug: Entered sendMessage with token = " + token);

        if (token == null || !jwtUtil.isTokenValid(token, getUserFromToken(token))) {
            message.setType(MessageType.ERROR);
            message.setContent("Invalid or expired token.");
            System.out.println("Debug: Token is invalid or expired, sending error message.");
            messagingTemplate.convertAndSend("/topic/chat-room/" + message.getRoom().getRoomId(), message);
            return;
        }

        // Check if sender is a Support Agent
        User sender = getUserFromToken(token);
        if (sender == null) {
            message.setType(MessageType.ERROR);
            message.setContent("Sender not found.");
            System.out.println("Debug: Sender not found, sending error message.");
            messagingTemplate.convertAndSend("/topic/chat-room/" + message.getRoom().getRoomId(), message);
            return;
        }

        // Get the roomId
        Long roomId = Long.parseLong(message.getRoom().getRoomId());
        System.out.println("Debug: roomId = " + roomId);

        // Determine recipients based on sender's role
        if (sender.getRoleType() == RoleType.SUPPORTAGENT) {
            // If the sender is a SupportAgent, send to other users in the room
            List<User> nonSupportUsers = userRepository.findUsersByRoomIdAndRole(roomId, RoleType.PLAYER); // Assuming `PLAYER` is a non-support role
            System.out.println("Debug: Found " + nonSupportUsers.size() + " non-support users.");
            for (User user : nonSupportUsers) {
                messagingTemplate.convertAndSendToUser(user.getId().toString(), "/queue/private", message);
            }
        } else {
            // If the sender is not a SupportAgent, send to the support agents in the room
            List<User> supportAgents = userRepository.findUsersByRoomIdAndRole(roomId, RoleType.SUPPORTAGENT);
            System.out.println("Debug: Found " + supportAgents.size() + " support agents.");
            for (User supportAgent : supportAgents) {
                messagingTemplate.convertAndSendToUser(supportAgent.getId().toString(), "/queue/private", message);
            }
        }

        // Set timestamp and finalize message
        message.setTimestamp(LocalDateTime.now());
        message.setType(MessageType.CHAT); // It's a regular chat message
        System.out.println("Debug: Message sent with content: " + message.getContent());
    }

    @MessageMapping("/chat-addUser")
    @SendTo("/topic/privateroom")
    public Message addUser(@Payload Message message, SimpMessageHeaderAccessor headerAccessor) {
        String token = (String) headerAccessor.getSessionAttributes().get("token");
        System.out.println("Debug: Entered addUser with token = " + token);

        // Token validation
        if (token == null || !jwtUtil.isTokenValid(token, getUserFromToken(token))) {
            message.setType(MessageType.ERROR);
            message.setContent("Invalid or expired token.");
            System.out.println("Debug: Token is invalid or expired, sending error message.");
            return message;
        }

        if (message.getSenderId() == null) {
            message.setType(MessageType.ERROR);
            message.setContent("Sender ID is missing.");
            System.out.println("Debug: Sender ID missing, sending error message.");
            return message;
        }

        Optional<User> userOptional = userRepository.findById(message.getSenderId());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            headerAccessor.getSessionAttributes().put("username", user.getFirstName());
            message.setSendername(user.getFirstName());
            message.setType(MessageType.JOIN);
            message.setTimestamp(LocalDateTime.now());
            System.out.println("Debug: User " + user.getFirstName() + " joined the chat.");
        } else {
            message.setType(MessageType.ERROR);
            message.setContent("User not found.");
            System.out.println("Debug: User not found, sending error message.");
        }

        return message;
    }

    @MessageMapping("/chat.privateMessage")
    @SendTo("/topic/private/{recipient}")
    public Message privateMessage(@Payload Message message, @DestinationVariable String recipient, SimpMessageHeaderAccessor headerAccessor) {
        String token = (String) headerAccessor.getSessionAttributes().get("token");
        System.out.println("Debug: Entered privateMessage with token = " + token + " and recipient = " + recipient);

        // Token validation
        if (token == null || !jwtUtil.isTokenValid(token, getUserFromToken(token))) {
            message.setType(MessageType.ERROR);
            message.setContent("Invalid or expired token.");
            System.out.println("Debug: Token is invalid or expired, sending error message.");
            return message;
        }

        message.setTimestamp(LocalDateTime.now());
        if (recipient == null || message.getContent() == null) {
            message.setType(MessageType.ERROR);
            message.setContent("Recipient or message content is missing.");
            System.out.println("Debug: Missing recipient or content, sending error message.");
            return message;
        }

        messagingTemplate.convertAndSendToUser(recipient, "/queue/private", message);
        System.out.println("Debug: Private message sent to recipient: " + recipient);
        return message;
    }

    @MessageMapping("/chat.history")
    @SendTo("/topic/privateroom")
    public List<Message> fetchMessageHistory(@Payload String roomId) {
        if (roomId == null || roomId.isEmpty()) {
            throw new IllegalArgumentException("Room ID cannot be null or empty");
        }

        System.out.println("Debug: Fetching message history for roomId = " + roomId);
        List<Message> messages = messageRepository.findMessagesByRoomId(Long.parseLong(roomId));
        if (messages.isEmpty()) {
            Message noMessages = new Message();
            noMessages.setType(MessageType.INFO);
            noMessages.setContent("No messages in this room yet.");
            messages.add(noMessages);
            System.out.println("Debug: No messages found in room " + roomId + ".");
        }
        return messages;
    }

    @GetMapping("/msg/getRoomMessages")
    public List<Message> getRoomMessages(@RequestParam Long roomId) {
        System.out.println("Debug: Getting messages for roomId = " + roomId);
        List<Message> messages = messageRepository.findMessagesByRoomId(roomId);
        if (messages.isEmpty()) {
            Message noMessages = new Message();
            noMessages.setType(MessageType.INFO);
            noMessages.setContent("No messages in this room yet.");
            messages.add(noMessages);
            System.out.println("Debug: No messages found in room " + roomId + ".");
        }
        return messages;
    }*/
    @MessageMapping("/send-message")
    public void sendNotification(Msg message) {
        // notification.getUserId() MUST BE a String, matching Principal.getName() (e.g., "3")
        messagingTemplate.convertAndSendToUser(
                message.getUserId(),          // recipient (String user ID)
                "/queue/room/"+message.getRoomId(),            // destination (always with leading '/')
                message                       // payload (the whole object, not just message)
        );
        System.out.println("Sent message to user " + message.getUserId());
    }

   /* @MessageMapping("/chat-room/{roomId}/send")
    public void sendRoomMessage(@DestinationVariable String roomId,
                                @Payload Message message,
                                SimpMessageHeaderAccessor headerAccessor) {
        String token = (String) headerAccessor.getSessionAttributes().get("token");
        System.out.println("Debug: Sending message to room " + roomId + " with token = " + token);

        // Check token validity
        if (token == null || !jwtUtil.isTokenValid(token, getUserFromToken(token))) {
            Message errorMessage = new Message();
            errorMessage.setType(MessageType.ERROR);
            errorMessage.setContent("Invalid or expired token.");
            errorMessage.setTimestamp(LocalDateTime.now());
            messagingTemplate.convertAndSend("/topic/chat-room/" + roomId, errorMessage);
            System.out.println("Debug: Token is invalid or expired, sending error message.");
            return;
        }

        // Create and set the Room object properly
        Room room = new Room();
        room.setRoomId(roomId);
        message.setRoom(room);

        // Set message metadata
        message.setTimestamp(LocalDateTime.now());
        message.setType(MessageType.CHAT); // Regular chat message
        System.out.println("Debug: Sending message content: " + message.getContent());

        messagingTemplate.convertAndSend("/topic/chat-room/" + roomId, message);
    }

    @GetMapping("/chat-room/users")
    public List<User> getUsersInRoom(@RequestParam Long roomId) {
        System.out.println("Debug: Fetching users for roomId = " + roomId);
        List<User> usersInRoom = userRepository.findUsersByRoomId(roomId);
        if (usersInRoom.isEmpty()) {
            System.out.println("Debug: No users found in room " + roomId + ".");
        }
        return usersInRoom;
    }*/
}
