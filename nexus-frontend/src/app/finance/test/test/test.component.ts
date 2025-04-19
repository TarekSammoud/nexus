import { Component } from '@angular/core';
import { NotificationService } from 'src/services/finance/notification.service';
import { WsNotificationsService } from 'src/services/finance/ws-notifications.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  notifications: string[] = [];  // Store notifications here
  token: string = 'your-jwt-token';  // Replace with actual JWT token logic
    constructor(private wsNotificationsService: WsNotificationsService,private notificationService : NotificationService) {  }

  ngOnInit(): void {
    this.token = localStorage.getItem('auth_token') || ''; // Retrieve the token from local storage or set a default value
    
     // Connect to the WebSocket server and listen for notifications
     this.wsNotificationsService.connect(this.token, (notification: any) => {
      // Handle the incoming notification
      console.log('Received notification:', notification);
      this.notificationService.show(notification.message, 5000); // Show the notification for 5 seconds
    });}
    sendNotification(): void {
     const message = { userId: '3', message: 'Hello, you have a new notification!' };
     this.wsNotificationsService.sendMessage('/app/send-notification', message); // Send the notification
    }
  
    showNotification(message: string): void {
      // Example: Show the notification in a custom UI (e.g., banner)
      alert('New Notification: ' + message);
    }

}
