package tn.arctic.nexus.services.UsersModule;

import tn.arctic.nexus.entities.FriendRequest;
import tn.arctic.nexus.entities.User;

import java.util.List;
import java.util.Map;

public interface IFriendRequestService {
    List<FriendRequest> retrieveAllFriendRequest();
    FriendRequest envoyerFriendRequest (FriendRequest FriendRequests);
    FriendRequest updateFriendRequest (FriendRequest fr);
    FriendRequest retrieveFriendRequest(long idFriendRequest);
    void removeFriendRequest(long idFriendRequest);
    List<User> findAvailablePlayersForFriendRequest(Long id);
    List<FriendRequest> getReceivedFriendRequests(Long userId);
    boolean rejectRequest(Long requestId);
     FriendRequest acceptRequest(Long requestId);
    List<User> recommendFriends(Long userId);
    public Map<User, Long> getRecommendedUsersWithMutualCount(Long userId);
}
