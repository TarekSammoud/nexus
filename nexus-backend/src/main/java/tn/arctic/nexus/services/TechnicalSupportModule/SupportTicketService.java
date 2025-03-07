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

    public List<SupportTicket> getAllTickets() {
        return supportTicketRepository.findAll();
    }

    public Optional<SupportTicket> getTicketById(Long id) {
        return supportTicketRepository.findById(id);
    }

    public SupportTicket createTicket(SupportTicket ticket) {
        return supportTicketRepository.save(ticket);
    }

    public void deleteTicket(Long id) {
        supportTicketRepository.deleteById(id);
    }
}