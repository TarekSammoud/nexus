package tn.arctic.nexus.controllers.UsersModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.FriendRequest;
import tn.arctic.nexus.services.UsersModule.IFriendRequestService;

import java.util.List;

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
        return friendRequestService.addFriendRequest(friendRequest);
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
}
