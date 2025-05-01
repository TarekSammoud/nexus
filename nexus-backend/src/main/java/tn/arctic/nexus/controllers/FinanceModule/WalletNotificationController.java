package tn.arctic.nexus.controllers.FinanceModule;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import tn.arctic.nexus.entities.FinanceModule.WalletNotifications;

@CrossOrigin(origins = "http://nexus-frontend.frontend.svc.cluster.local:4200")
@RestController
public class WalletNotificationController {

    private final SimpMessagingTemplate messagingTemplate;

    public WalletNotificationController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    // This endpoint will receive the notification request from your frontend
    @MessageMapping("/send-notification")
    public void sendNotification(WalletNotifications notification) {
        // notification.getUserId() MUST BE a String, matching Principal.getName() (e.g., "3")
        messagingTemplate.convertAndSendToUser(
                notification.getUserId(),          // recipient (String user ID)
                "/queue/notifications",            // destination (always with leading '/')
                notification                       // payload (the whole object, not just message)
        );
        //System.out.println("Sent notification to user " + notification.getUserId());
    }
}