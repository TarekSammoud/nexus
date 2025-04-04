package tn.arctic.nexus.repositories.TechnicalSupportModule;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.arctic.nexus.entities.Room;

import java.util.Optional;

public interface IRoomRepository extends JpaRepository<Room, Long> {
    Optional<Room> findByTicketId(Long ticketId);
}
