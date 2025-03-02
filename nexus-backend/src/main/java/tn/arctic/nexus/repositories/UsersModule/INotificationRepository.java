package tn.arctic.nexus.repositories.UsersModule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import tn.arctic.nexus.entities.FriendRequest;
import tn.arctic.nexus.entities.Notification;

import java.util.List;

public interface INotificationRepository  extends JpaRepository<Notification,Long> {

}
