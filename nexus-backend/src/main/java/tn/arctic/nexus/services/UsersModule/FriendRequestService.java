package tn.arctic.nexus.services.UsersModule;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.FriendRequest;
import tn.arctic.nexus.entities.StatusFriendRequest;
import tn.arctic.nexus.entities.User;
import tn.arctic.nexus.repositories.UsersModule.IFriendRequestRepository;
import tn.arctic.nexus.repositories.UsersModule.IUserRepository;

import java.util.List;
@Service
public class FriendRequestService implements IFriendRequestService{

    @Autowired
    private IFriendRequestRepository friendRequestRepository;

    @Autowired
    private IUserRepository userRepository;

    @Override
    public List<FriendRequest> retrieveAllFriendRequest() {
        return friendRequestRepository.findAll();
    }

    @Override
    public FriendRequest envoyerFriendRequest(FriendRequest friendRequest) {
        // Récupérer les vrais objets User depuis la BDD à partir des IDs
        Long senderId = friendRequest.getSender().getId();
        Long recipientId = friendRequest.getRecipient().getId();


        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new RuntimeException("Sender not found with id: " + senderId));

        User recipient = userRepository.findById(recipientId)
                .orElseThrow(() -> new RuntimeException("Recipient not found with id: " + recipientId));

        // Mettre à jour les relations avec les objets complets
        friendRequest.setSender(sender);
        friendRequest.setRecipient(recipient);
        friendRequest.setStatus(StatusFriendRequest.PENDING);


        return friendRequestRepository.save(friendRequest);
    }

    @Override
    public FriendRequest updateFriendRequest(FriendRequest fr) {
        return friendRequestRepository.save(fr);
    }

    @Override
    public FriendRequest retrieveFriendRequest(long idFriendRequest) {
        return friendRequestRepository.findById(idFriendRequest).get();
    }

    @Override
    public void removeFriendRequest(long idFriendRequest) {
        friendRequestRepository.deleteById(idFriendRequest);
    }

    @Override
    public List<User> findAvailablePlayersForFriendRequest(Long id) {
        return userRepository.findAvailablePlayersForFriendRequest(id);
    }



    @Transactional
    public List<FriendRequest> getReceivedFriendRequests(Long userId) {
        // Récupérer toutes les demandes d'amis où l'utilisateur est le destinataire et que le statut est PENDING
        return friendRequestRepository.findByRecipientIdAndStatus(userId, StatusFriendRequest.PENDING);
    }

    @Override
    public void acceptRequest(Long requestId) {
        FriendRequest friendRequest = friendRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("FriendRequest not found"));

        friendRequest.setStatus(StatusFriendRequest.ACCEPTED);

        User sender = friendRequest.getSender();
        User recipient = friendRequest.getRecipient();

        // Ajouter mutuellement à la liste des amis
        if (!sender.getFriends().contains(recipient)) {
            sender.getFriends().add(recipient);
        }

        if (!recipient.getFriends().contains(sender)) {
            recipient.getFriends().add(sender);
        }

        // Sauvegarder les deux utilisateurs
        userRepository.save(sender);
        userRepository.save(recipient);

        // Sauvegarder la mise à jour du FriendRequest
        friendRequestRepository.save(friendRequest);
    }

    @Override
    public void rejectRequest(Long requestId) {
        FriendRequest request = friendRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Friend request not found"));

        request.setStatus(StatusFriendRequest.REJECTED);
        friendRequestRepository.save(request);
    }

}
