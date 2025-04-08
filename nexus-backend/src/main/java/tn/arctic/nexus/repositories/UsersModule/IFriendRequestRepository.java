package tn.arctic.nexus.repositories.UsersModule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import tn.arctic.nexus.entities.FriendRequest;
import tn.arctic.nexus.entities.StatusFriendRequest;

import java.util.List;

public interface IFriendRequestRepository  extends JpaRepository<FriendRequest,Long> {

    List<FriendRequest> findByRecipientIdAndStatus(Long recipientId, StatusFriendRequest status);

}
