package tn.arctic.nexus.services.TechnicalSupportModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.SupportTicket;

import tn.arctic.nexus.repositories.TechnicalSupportModule.ISupportTicketRepository;

import java.util.List;
import java.util.Optional;

@Service
public class SupportTicketService {

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
}
