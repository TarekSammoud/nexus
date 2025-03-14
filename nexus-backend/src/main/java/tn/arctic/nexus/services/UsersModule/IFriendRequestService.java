package tn.arctic.nexus.services.UsersModule;

import tn.arctic.nexus.entities.FriendRequest;

import java.util.List;

public interface IFriendRequestService {
    List<FriendRequest> retrieveAllFriendRequest();
    FriendRequest addFriendRequest (FriendRequest FriendRequests);
    FriendRequest updateFriendRequest (FriendRequest fr);
    FriendRequest retrieveFriendRequest(long idFriendRequest);
    void removeFriendRequest(long idFriendRequest);
}
