import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/services/finance/notification.service';
import { WsNotificationsService } from 'src/services/finance/ws-notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  token: string = 'your-jwt-token';  // Replace with actual JWT token logic
  title = 'nexus-frontend';
  constructor(private wsNotificationsService: WsNotificationsService,private notificationService : NotificationService) {  }
  ngOnInit(): void {
    this.token = localStorage.getItem('auth_token') || ''; // Retrieve the token from local storage or set a default value
    
    // Connect to the WebSocket server and listen for notifications
    this.wsNotificationsService.connect(this.token, (notification: any) => {
     // Handle the incoming notification
     console.log('Received notification:', notification);
     this.notificationService.show(notification.message, 5000); // Show the notification for 5 seconds
   });
  }



}
