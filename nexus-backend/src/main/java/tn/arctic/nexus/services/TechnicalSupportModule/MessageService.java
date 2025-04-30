package tn.arctic.nexus.services.TechnicalSupportModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.Message;
import tn.arctic.nexus.entities.MessageType;
import tn.arctic.nexus.entities.Room;
import tn.arctic.nexus.repositories.TechnicalSupportModule.IMessageRepository;
import tn.arctic.nexus.repositories.TechnicalSupportModule.IRoomRepository;

import java.time.LocalDateTime;

@Service
public class MessageService {

    @Autowired
    private IMessageRepository messageRepository;

    @Autowired
    private IRoomRepository roomRepository;

    // Send a message to a room
    public Message sendMessage(Long roomId, String senderName, Long senderId, String content, MessageType type) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        Message message = Message.builder()
                .room(room)
                .sendername(senderName)
                .senderId(senderId)
                .content(content)
                .type(type)
                .timestamp(LocalDateTime.now())
                .build();

        return messageRepository.save(message);
    }

}
