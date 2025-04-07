package tn.arctic.nexus.repositories.TechnicalSupportModule;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.arctic.nexus.entities.Message;

public interface IMessageRepository extends JpaRepository<Message, Long> {
    // You can add custom queries here if necessary, e.g., for fetching messages by room ID
}
