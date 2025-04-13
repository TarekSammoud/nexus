package tn.arctic.nexus.services.TechnicalSupportModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.PerformanceReview;
import tn.arctic.nexus.entities.SupportAgent;
import tn.arctic.nexus.entities.SupportTicket;
import tn.arctic.nexus.entities.TicketPriority;
import tn.arctic.nexus.repositories.TechnicalSupportModule.ISupportAgentRepository;
import tn.arctic.nexus.repositories.TechnicalSupportModule.ISupportTicketRepository;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class SupportTicketService {
    @Autowired
    private ISupportAgentRepository supportAgentRepository;

    @Autowired
    private ISupportTicketRepository supportTicketRepository;

    // Get all tickets
    public List<SupportTicket> getAllTickets() {
        return supportTicketRepository.findAll();
    }

    // Get ticket by ID
    public Optional<SupportTicket> getTicketById(Long id) {
        return supportTicketRepository.findById(id);
    }

    // Create a new ticket
    public SupportTicket createTicket(SupportTicket ticket) {
        return supportTicketRepository.save(ticket);
    }

    // Update an existing ticket
    public SupportTicket updateTicket(SupportTicket ticket) {
        return supportTicketRepository.save(ticket);
    }

    // Delete a ticket
    public boolean deleteTicket(Long id) {
        if (supportTicketRepository.existsById(id)) {
            supportTicketRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<SupportTicket> getTicketByRoomId(Long roomId) {
        return supportTicketRepository.findByRoomId(roomId);
    }

    public List<SupportTicket> getTicketsSortedByPriorityAndCreatedAt() {
        List<SupportTicket> tickets = supportTicketRepository.findAll();

        tickets.sort(Comparator
                .comparing((SupportTicket t) -> getPriorityOrder(t.getPriority()))
                .thenComparing(SupportTicket::getCreatedAt, Comparator.nullsLast(Comparator.reverseOrder())));

        return tickets;
    }

    // Custom priority ranking with null check
    private int getPriorityOrder(TicketPriority priority) {
        if (priority == null) {
            // Handle the null case, for example, assign a default priority
            return 5; // Default to a lowest priority if null
        }
        return switch (priority) {
            case CRITICAL -> 1;
            case HIGH -> 2;
            case MEDIUM -> 3;
            case LOW -> 4;
            default -> 5;
        };
    }


}
