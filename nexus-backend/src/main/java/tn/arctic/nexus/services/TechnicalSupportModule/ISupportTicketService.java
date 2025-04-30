package tn.arctic.nexus.services.TechnicalSupportModule;

import tn.arctic.nexus.entities.SupportTicket;

import java.util.List;
import java.util.Optional;

public interface ISupportTicketService {
    List<SupportTicket> getAllTickets();
    Optional<SupportTicket> getTicketById(Long id);
    SupportTicket createTicket(SupportTicket ticket);
    void deleteTicket(Long id);
    public List<SupportTicket> getTicketsSortedByPriorityAndCreatedAt();
}