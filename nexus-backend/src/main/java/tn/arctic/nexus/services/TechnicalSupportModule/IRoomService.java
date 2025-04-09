package tn.arctic.nexus.services.TechnicalSupportModule;



import tn.arctic.nexus.entities.Message;
import tn.arctic.nexus.entities.Room;

import java.util.List;

public interface IRoomService {
    Room creerRoom(Long ticketId);

    void fermerRoom(Long ticketId);

    List<Room> getAllRooms();

    Message sendMessageToRoom(Long roomId, String sender, String content);

    List<Message> getMessagesByRoom(Long roomId);
}
