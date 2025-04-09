package tn.arctic.nexus.repositories.TechnicalSupportModule;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.arctic.nexus.entities.Message;
import tn.arctic.nexus.entities.Room;

import java.util.List;

public interface IMessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByRoom(Room room);
    // You can add custom queries here if necessary, e.g., for fetching messages by room ID
}
