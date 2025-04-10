package tn.arctic.nexus.controllers.UsersModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.FriendRequest;
import tn.arctic.nexus.entities.User;
import tn.arctic.nexus.services.UsersModule.FriendRequestService;
import tn.arctic.nexus.services.UsersModule.IFriendRequestService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/friendRequests")
public class FriendRequestController {

    @Autowired
    private IFriendRequestService friendRequestService;



    @GetMapping("/allFriendRequest")
    public List<FriendRequest> getAllFriendRequests() {
        return friendRequestService.retrieveAllFriendRequest();
    }

    @PostMapping("/addFriendRequest")
    public FriendRequest addFriendRequests(@RequestBody FriendRequest friendRequest) {
        return friendRequestService.envoyerFriendRequest(friendRequest);
    }

    @PutMapping()
    public FriendRequest updateFriendRequest(@RequestBody FriendRequest friendRequest) {
        return friendRequestService.updateFriendRequest(friendRequest);
    }

    @GetMapping("/getbyIdFriendRequest/{id}")
    public FriendRequest getFriendRequestById(@PathVariable Long id) {
        return friendRequestService.retrieveFriendRequest(id);
    }

    @DeleteMapping("/deleteFriendRequest/{id}")
    public void deleteFriendRequest(@PathVariable Long id) {
        friendRequestService.removeFriendRequest(id);
    }


    // pour retourner les user qui n ont pas des invitavtion
    @GetMapping("/players/available/{id}")
    public List<User> getAvailablePlayers(@PathVariable Long id) {
        System.out.println("==> getAvailablePlayers called for id: " + id);
        return friendRequestService.findAvailablePlayersForFriendRequest(id);
    }

    @GetMapping("/received/{userId}")
    public List<FriendRequest> getReceivedFriendRequests(@PathVariable Long userId) {
        List<FriendRequest> friendRequests = friendRequestService.getReceivedFriendRequests(userId);
        return friendRequests;
    }

    @PutMapping("/accept/{requestId}")
    public FriendRequest acceptFriendRequest(@PathVariable Long requestId) {
        try {
            return friendRequestService.acceptRequest(requestId);  // Retourner directement l'objet FriendRequest mis à jour
        } catch (Exception e) {
            throw new RuntimeException("Failed to accept friend request", e);  // Gestion de l'erreur en levant une exception
        }
    }



    @PutMapping("/reject/{requestId}")
    public boolean rejectFriendRequest(@PathVariable Long requestId) {
        try {
            return friendRequestService.rejectRequest(requestId);
        } catch (Exception e) {
            throw new RuntimeException("Failed to reject friend request", e);
        }
    }



}
