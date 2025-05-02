import { Injectable } from '@angular/core';
import * as Stomp from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class WsNotificationsService {
  private stompClient!: Stomp.Client;

  /**
   * Connect to the WebSocket server and subscribe to the notification channel.
   * 
   * @param token - The JWT token for user authentication.
   * @param onMessage - The callback function to handle incoming messages.
   */
  connect(token: string, onMessage: (msg: any) => void): void {
    // Use native WebSocket connection instead of SockJS
    const socket = new WebSocket('/ws_api/nexus-backend/ws-notifications');

    this.stompClient = new Stomp.Client({
      webSocketFactory: () => socket // Directly use the native WebSocket connection
   //   debug: (str: string) => //console.log(str) // Enable debugging to log messages in console
    });

    // Configure the STOMP client
    this.stompClient.configure({
      connectHeaders: {
        Authorization: 'Bearer ' + token // Attach JWT token for authentication
      },
      onConnect: () => {
        //console.log('WebSocket connected');
        this.stompClient.subscribe('/user/queue/notifications', (message) => {
          const body = JSON.parse(message.body);
          onMessage(body); // Handle incoming notification
        });
      },
      onStompError: (frame) => {
        console.error('Error connecting to WebSocket:', frame);
      }
    });

    // Activate the connection to the WebSocket server
    this.stompClient.activate();
  }

  /**
   * Disconnect from the WebSocket server.
   */
  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
      //console.log('Disconnected from WebSocket server.');
    }
  }

  /**
   * Send a message to a specific user via WebSocket.
   * 
   * @param destination - The destination for the message (e.g., a specific topic).
   * @param message - The message to be sent.
   */
  sendMessage(destination: string, message: any) {
    if (this.stompClient && this.stompClient.connected) {
      try {
        this.stompClient.publish({
          destination: destination,
          body: JSON.stringify(message)
        });
        //console.log(`Message sent to ${destination}`);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    } else {
      console.error('STOMP client is not connected.');
    }
  }
}