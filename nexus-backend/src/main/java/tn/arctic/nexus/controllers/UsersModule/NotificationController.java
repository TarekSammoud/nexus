package tn.arctic.nexus.controllers.UsersModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.Notification;
import tn.arctic.nexus.services.UsersModule.INotificationService;

import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    @Autowired
    private INotificationService notificationService;


    @GetMapping("/all-notif")
    public List<Notification> getAllNotifications() {
        return notificationService.retrieveAllNotification();
    }

    @PostMapping("/addNotif")
    public Notification addNotification(@RequestBody Notification notification) {
        return (Notification) notificationService.addNotification(notification);
    }

    @PutMapping()
    public Notification updateNotification(@RequestBody Notification notification) {
        return notificationService.updateNotification(notification);
    }

    @GetMapping("/getNotif/{id}")
    public Notification getNotificationById(@PathVariable Long id) {
        return notificationService.retrieveNotification(id);
    }

    @DeleteMapping("/deleteNotif/{id}")
    public void deleteNotification(@PathVariable Long id) {
        notificationService.removeNotification(id);
    }
}
