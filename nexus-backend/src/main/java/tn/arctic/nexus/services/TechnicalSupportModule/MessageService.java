package tn.arctic.nexus.services.TechnicalSupportModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.Message;
import tn.arctic.nexus.entities.Room;
import tn.arctic.nexus.repositories.TechnicalSupportModule.IMessageRepository;
import tn.arctic.nexus.repositories.TechnicalSupportModule.IRoomRepository;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class MessageService {

    @Autowired
    private IMessageRepository messageRepository;

    @Autowired
    private IRoomRepository roomRepository;

    // Send a message to a room
    public Message sendMessage(Long roomId, String sender, String content) {
        // Find the room by its ID
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        // Create the message object
        Message message = new Message();
        message.setRoom(room);
        message.setSender(sender);
        message.setContent(content);
        message.setTimestamp(LocalDateTime.now()); // Set the timestamp when the message is created

        // Save the message to the repository
        return messageRepository.save(message);
    }

    // Optionally, you can implement additional logic for fetching messages for a room
}
