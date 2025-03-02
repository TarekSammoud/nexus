package tn.arctic.nexus.services.UsersModule;

import tn.arctic.nexus.entities.FriendRequest;
import tn.arctic.nexus.entities.Notification;

import java.util.List;

public interface INotificationService {
    List<Notification> retrieveAllNotification();
    Notification addNotification (Notification Notifications);
    Notification updateNotification (Notification nf);
    Notification retrieveNotification(long idNotification);
    void removeNotification(long idNotification);

}