package tn.arctic.nexus.repositories.UsersModule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import tn.arctic.nexus.entities.FriendRequest;
import tn.arctic.nexus.entities.StatusFriendRequest;

import java.util.List;

public interface IFriendRequestRepository  extends JpaRepository<FriendRequest,Long> {

    List<FriendRequest> findByRecipientIdAndStatus(Long recipientId, StatusFriendRequest status);

    // affichage liste des amis
    @Query("SELECT fr FROM FriendRequest fr WHERE (fr.sender.id = :userId OR fr.recipient.id = :userId) AND fr.status = :status")
    List<FriendRequest> findAcceptedFriends(@Param("userId") long userId, @Param("status") StatusFriendRequest status);


    //utliser pour ML

    @Query("SELECT CASE WHEN fr.sender.id = :userId THEN fr.recipient.id ELSE fr.sender.id END " +
            "FROM FriendRequest fr " +
            "WHERE (fr.sender.id = :userId OR fr.recipient.id = :userId) " +
            "AND fr.status = tn.arctic.nexus.entities.StatusFriendRequest.ACCEPTED")
    List<Long> findAcceptedFriendIds(@Param("userId") Long userId);


    FriendRequest findBySenderIdAndRecipientIdAndStatus(Long senderId, Long recipientId, StatusFriendRequest status);

}
