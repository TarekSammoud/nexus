package tn.arctic.nexus.controllers.TechnicalSupportModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.SupportTicket;
import tn.arctic.nexus.services.TechnicalSupportModule.SupportTicketService;

import java.util.List;

@RestController
@RequestMapping("/tickets")
public class SupportTicketController {
    @Autowired
    private SupportTicketService supportTicketService;

    @GetMapping("getAll")
    public List<SupportTicket> getAllTickets() {
        return supportTicketService.getAllTickets();
    }

    @PostMapping
    public SupportTicket createTicket(@RequestBody SupportTicket ticket) {
        return supportTicketService.createTicket(ticket);
    }
}
