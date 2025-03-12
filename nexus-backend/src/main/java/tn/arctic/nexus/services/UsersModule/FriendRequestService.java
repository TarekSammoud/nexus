package tn.arctic.nexus.services.UsersModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.FriendRequest;
import tn.arctic.nexus.repositories.UsersModule.IFriendRequestRepository;

import java.util.List;
@Service
public class FriendRequestService implements IFriendRequestService{

    @Autowired
    private IFriendRequestRepository friendRequestRepository;


    @Override
    public List<FriendRequest> retrieveAllFriendRequest() {
        return friendRequestRepository.findAll();
    }

    @Override
    public FriendRequest addFriendRequest(FriendRequest FriendRequests) {
        return friendRequestRepository.save(FriendRequests);
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
