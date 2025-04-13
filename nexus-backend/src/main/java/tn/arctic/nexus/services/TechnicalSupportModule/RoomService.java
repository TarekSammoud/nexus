package tn.arctic.nexus.services.TechnicalSupportModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tn.arctic.nexus.entities.Message;
import tn.arctic.nexus.entities.Room;
import tn.arctic.nexus.entities.SupportTicket;
import tn.arctic.nexus.repositories.TechnicalSupportModule.IMessageRepository;
import tn.arctic.nexus.repositories.TechnicalSupportModule.IRoomRepository;
import tn.arctic.nexus.repositories.TechnicalSupportModule.ISupportTicketRepository;
import tn.arctic.nexus.repositories.UsersModule.IUserRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service

public class RoomService implements IRoomService {

    @Autowired
    private IRoomRepository roomRepository;

    @Autowired
    private ISupportTicketRepository ticketRepository;

    @Autowired
    private IMessageRepository messageRepository;

    @Autowired
    private MessageService messageService;

    @Autowired
    private IUserRepository userRepository;

    @Override
    @Transactional
    public Room creerRoom(Long ticketId) {
        // Vérifier si le ticket existe
        SupportTicket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket non trouvé"));

        // Vérifier si une room existe déjà pour ce ticket
        Optional<Room> existingRoom = roomRepository.findByTicketId(ticketId);
        if (existingRoom.isPresent()) {
            throw new RuntimeException("Une room existe déjà pour ce ticket.");
        }

        // Créer la room
        Room room = new Room();
        room.setTicket(ticket);
     // Lien fictif
        room.setDateCreation(LocalDateTime.now());
        room.setDernierMessage(LocalDateTime.now());
        room.setActive(true);
        roomRepository.save(room);
        room.setLien("http://localhost:4200/room/" + room.getId());
        // Associer la room au ticket
        ticket.setRoom(room);
        ticketRepository.save(ticket);

        return room;
    }

    @Override
    @Transactional
    public void fermerRoom(Long ticketId) {
        // Récupérer la room associée au ticket
        Optional<Room> roomOpt = roomRepository.findByTicketId(ticketId);
        if (!roomOpt.isPresent()) {
            throw new RuntimeException("Room non trouvée pour ce ticket.");
        }

        Room room = roomOpt.get();
        room.setActive(false);
        roomRepository.save(room);

        // Désassocier la room du ticket
        SupportTicket ticket = room.getTicket();
        ticket.setRoom(null);
        ticketRepository.save(ticket);
    }

    @Override
    public List<Room> getAllRooms() {
        try {
            return roomRepository.findAll();
        } catch (Exception e) {
            // Log the error here
            return List.of(); // Return an empty list if there's an error
        }
    }

    @Override
    public Message sendMessageToRoom(Long roomId, String sender, String content) {
        return messageService.sendMessage(roomId, sender, content);
    }

    @Override
    public List<Message> getMessagesByRoom(Long roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room non trouvée"));
        return messageRepository.findByRoom(room);
    }

    public void deleteRoom(Long id) {
        if (roomRepository.existsById(id)) {
            roomRepository.deleteById(id);
        }
    }
}
