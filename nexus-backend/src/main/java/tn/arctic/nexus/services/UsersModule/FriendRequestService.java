package tn.arctic.nexus.services.UsersModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.FriendRequest;
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
    public FriendRequest addFriendRequest(FriendRequest friendRequest) {
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
}
