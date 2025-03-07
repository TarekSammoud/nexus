package tn.arctic.nexus.services.TechnicalSupportModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.TicketMessage;
import tn.arctic.nexus.repositories.TechnicalSupportModule.ITicketMessageRepository;

import java.util.List;

@Service
public class TicketMessageService {
    @Autowired
    private ITicketMessageRepository ticketMessageRepository;

    public List<TicketMessage> getMessagesByTicketId(Long ticketId) {
        return ticketMessageRepository.findBySupportTicketId(ticketId);
    }

    public TicketMessage addMessage(TicketMessage message) {
        return ticketMessageRepository.save(message);
    }
}