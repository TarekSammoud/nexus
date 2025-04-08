package tn.arctic.nexus.services.TechnicalSupportModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.Message;
import tn.arctic.nexus.entities.Room;
import tn.arctic.nexus.entities.SupportTicket;
import tn.arctic.nexus.entities.User;
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
    public Room creerRoom(Long ticketId, Long userId) {
        // Vérifier si le ticket existe
        System.out.println("Info1");
        SupportTicket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket non trouvé"));
        System.out.println("Info2");

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User non trouvé"));
        System.out.println("Info3");
        // Vérifier si une room existe déjà pour ce ticket
        Optional<Room> existingRoom = roomRepository.findByTicketId(ticketId);
        if (existingRoom.isPresent()) {
            throw new RuntimeException("Une room existe déjà pour ce ticket.");
        }
        System.out.println("Info");
        System.out.println(user.getId());
        System.out.println(ticket.getId());

        // Créer la room
        Room room = new Room();
        room.setTicket(ticket);
        room.setUser(user);
        room.setLien("http://localhost:4200/room/" + ticketId); // Lien fictif
        room.setDateCreation(LocalDateTime.now());
        room.setDernierMessage(LocalDateTime.now());
        room.setActive(true);
        roomRepository.save(room);

        // Associer la room au ticket
        ticket.setRoom(room);
        ticketRepository.save(ticket);

        return room;
    }

    @Override
    public Room creerRoom(Long ticketId) {
        return null;
    }

    @Override
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

    public List<Room> getAllRooms() {
        return roomRepository.findAll();

    }
    public Message sendMessageToRoom(Long roomId, String sender, String content) {
        return messageService.sendMessage(roomId, sender, content);
    }

    public List<Message> getMessagesByRoom(Long roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        return room.getMessages();  // assuming there's a one-to-many relation
    }
}
