package tn.arctic.nexus.services.TechnicalSupportModule;



import tn.arctic.nexus.entities.Room;

public interface IRoomService {
    Room creerRoom(Long ticketId, Long userId);

    Room creerRoom(Long ticketId);
    void fermerRoom(Long ticketId);
}
