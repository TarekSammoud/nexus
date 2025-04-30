package tn.arctic.nexus.repositories.TechnicalSupportModule;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.arctic.nexus.entities.SupportTicket;

import java.util.List;
import java.util.Optional;

public interface ISupportTicketRepository extends JpaRepository<SupportTicket, Long> {
    List<SupportTicket> findByAssigneAId(Long agentId); // Example of a query method
    boolean existsByAssigneAId(Long agentId);
    Optional<SupportTicket> findByRoomId(Long roomId);
    List<SupportTicket> findAllByOrderByPriorityAscCreatedAtDesc();
}

