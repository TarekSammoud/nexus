package tn.arctic.nexus.repositories.UsersModule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import tn.arctic.nexus.entities.ProfilePictures;
import tn.arctic.nexus.entities.RoleType;
import tn.arctic.nexus.entities.User;

import java.util.List;
import java.util.Optional;

public interface IUserRepository  extends JpaRepository<User,Long> {

    //ProfilePictures findByUserId(Long id);
    User findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.roleType = tn.arctic.nexus.entities.RoleType.PLAYER AND u.id <> :id AND " +
            "u.id NOT IN (" +
            "   SELECT fr.sender.id FROM FriendRequest fr WHERE fr.recipient.id = :id" +
            "   UNION " +
            "   SELECT fr.recipient.id FROM FriendRequest fr WHERE fr.sender.id = :id" +
            ")")
    List<User> findAvailablePlayersForFriendRequest(@Param("id") Long userId);


    @Query("SELECT u FROM User u WHERE u.roleType = tn.arctic.nexus.entities.RoleType.PLAYER ORDER BY u.createdAt ASC")
    List<User> findTopUsersByActivity();

    User findByPhoneNumber(String phoneNumber);

    @Query("SELECT u FROM User u WHERE u.roleType = tn.arctic.nexus.entities.RoleType.SUPPORTAGENT")
    List<User> findAllSupportAgents();

    @Query("SELECT u FROM User u WHERE u.roleType = :roleType AND u.room.id = :roomId")
    List<User> findUsersByRoomIdAndRole(@Param("roomId") Long roomId, @Param("roleType") RoleType roleType);

    List<User> findUsersByRoomId(Long roomId);
}
