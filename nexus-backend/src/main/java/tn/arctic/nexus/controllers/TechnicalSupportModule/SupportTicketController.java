package tn.arctic.nexus.controllers.TechnicalSupportModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.SupportTicket;
import tn.arctic.nexus.services.TechnicalSupportModule.SupportTicketService;

import java.util.List;
import java.util.Optional;
@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/tickets")
public class SupportTicketController {

    @Autowired
    private SupportTicketService supportTicketService;
    
  /*  @Autowired
    private OpenAiApiService openAiApiService;
    */

    // Get all tickets
    @GetMapping("getAll")
    public List<SupportTicket> getAllTickets() {
        return supportTicketService.getAllTickets();
    }

    // Get ticket by ID
    @GetMapping("{id}")
    public ResponseEntity<SupportTicket> getTicketById(@PathVariable Long id) {
        Optional<SupportTicket> ticket = supportTicketService.getTicketById(id);
        return ticket.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Create a new ticket
    @PostMapping("createticket")
    public ResponseEntity<SupportTicket> createTicket(@RequestBody SupportTicket ticket) {
        SupportTicket savedTicket = supportTicketService.createTicket(ticket);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTicket);
    }

    // Update an existing ticket
    @PutMapping("{id}")
    public ResponseEntity<SupportTicket> updateTicket(@PathVariable Long id, @RequestBody SupportTicket ticket) {
        Optional<SupportTicket> existingTicket = supportTicketService.getTicketById(id);
        if (existingTicket.isPresent()) {
            ticket.setId(id);  // Ensure that the ticket ID remains unchanged during the update
            SupportTicket updatedTicket = supportTicketService.updateTicket(ticket);
            return ResponseEntity.ok(updatedTicket);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Delete a ticket
    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteTicket(@PathVariable Long id) {
        boolean isDeleted = supportTicketService.deleteTicket(id);
        return isDeleted ? ResponseEntity.status(HttpStatus.NO_CONTENT).build()
                : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("/tickets")
public ResponseEntity<Void> deleteAllTickets() {

    supportTicketService.deleteAllTickets();
    return ResponseEntity.noContent().build();
}


    @GetMapping("/by-room/{roomId}")
    public ResponseEntity<SupportTicket> getTicketByRoomId(@PathVariable Long roomId) {
        return supportTicketService.getTicketByRoomId(roomId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/sorted")
    public List<SupportTicket> getTicketsSortedByPriorityAndCreatedAt() {
        return supportTicketService.getTicketsSortedByPriorityAndCreatedAt();
    }
}

