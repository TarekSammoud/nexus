package tn.arctic.nexus.services.UsersModule;

import tn.arctic.nexus.entities.FriendRequest;
import tn.arctic.nexus.entities.User;

import java.util.List;

public interface IFriendRequestService {
    List<FriendRequest> retrieveAllFriendRequest();
    FriendRequest envoyerFriendRequest (FriendRequest FriendRequests);
    FriendRequest updateFriendRequest (FriendRequest fr);
    FriendRequest retrieveFriendRequest(long idFriendRequest);
    void removeFriendRequest(long idFriendRequest);
    List<User> findAvailablePlayersForFriendRequest(Long id);

}
