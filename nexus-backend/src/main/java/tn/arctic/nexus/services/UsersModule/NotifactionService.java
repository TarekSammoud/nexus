package tn.arctic.nexus.services.UsersModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.arctic.nexus.entities.Notification;
import tn.arctic.nexus.repositories.UsersModule.INotificationRepository;

import java.util.List;

@Service
public class NotifactionService implements INotificationService {
    @Autowired
    private INotificationRepository notificationRepository;

    @Override
    public List<Notification> retrieveAllNotification() {
        return notificationRepository.findAll() ;
    }

    @Override
    public Notification addNotification(Notification Notifications) {
        return notificationRepository.save(Notifications);
    }

    @Override
    public Notification updateNotification(Notification nf) {
        return notificationRepository.save(nf);
    }

    @Override
    public Notification retrieveNotification(long idNotification) {
        return notificationRepository.findById(idNotification).get()    ;
    }

    @Override
    public void removeNotification(long idNotification) {
notificationRepository.deleteById(idNotification);
    }
}
