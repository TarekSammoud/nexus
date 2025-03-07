package tn.arctic.nexus.repositories.TechnicalSupportModule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.arctic.nexus.entities.TicketMessage;

import java.util.List;

@Repository
public interface ITicketMessageRepository extends JpaRepository<TicketMessage, Long> {
    List<TicketMessage> findBySupportTicketId(Long ticketId);
}
