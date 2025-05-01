import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { Client, Message as StompMessage } from '@stomp/stompjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../entities/user/user.model';

// Define ChatMessage as it is the expected structure
export interface ChatMessage {
  id?: number;
  sendername?: string;
  senderId: number;
  recipientId?: number;
  content: string;
  type: 'CHAT' | 'JOIN' | 'LEAVE' | 'ERROR';
  timestamp?: string;
  room: {
    roomId: number;
  };
}

// IMessage interface which the WebSocket might return
export interface IMessage {
  senderId: number;
  content: string;
  type: string;
  room: {
    roomId: number;
  };
  timestamp?: string;
}

@Injectable({ providedIn: 'root' })
export class ChatRoomService {
  private stompClient!: Client;
  private messageSubject = new BehaviorSubject<ChatMessage | null>(null);
  public messages$ = this.messageSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Connexion WebSocket
  connect(roomId: string, userId: number, token: string): void {
    console.log(`Connecting to WebSocket for Room: ${roomId}, User: ${userId}, with token: ${token}`);

    this.stompClient = new Client({
      brokerURL: 'ws://localhost:9000/nexus-backend/ws-support',
      reconnectDelay: 5000,
      webSocketFactory: () => new SockJS('http://nexus-backend.backend.svc.cluster.local:9000/nexus-backend/ws-support'),
      connectHeaders: {
        'Authorization': `Bearer ${token}`,
      },
      onConnect: () => {
        console.log(`Successfully connected to WebSocket (Room: ${roomId})`);

        this.stompClient.subscribe(`/topic/chat-room/${roomId}`, (msg: StompMessage) => {
          // Convert IMessage to ChatMessage
          const parsedMessage: IMessage = JSON.parse(msg.body);

          // Create a ChatMessage with required fields
          const message: ChatMessage = {
            senderId: parsedMessage.senderId,
            content: parsedMessage.content,
            type: parsedMessage.type as 'CHAT' | 'JOIN' | 'LEAVE' | 'ERROR', // You may want to validate or handle other types
            room: { roomId: parsedMessage.room.roomId },
            timestamp: parsedMessage.timestamp || new Date().toISOString(), // Default timestamp if missing
          };

          console.log('Parsed message:', message);

          this.messageSubject.next(message); // Publish the ChatMessage
        });
      },
      onStompError: (frame) => {
        console.error('STOMP error frame received:', frame);
      },
    });

    this.stompClient.activate();
  }

  sendMessage(roomId: string, message: ChatMessage, token: string): void {
    console.log(`Attempting to send message to Room: ${roomId}`, message);
  
    if (this.stompClient.connected) {
      console.log('WebSocket is connected. Sending message...');
  
      this.stompClient.publish({
        destination: `/app/chat-room/${roomId}/send`,
        body: JSON.stringify(message),
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    } else {
      console.warn('WebSocket is not connected. Message not sent.');
    }
  }
  

  // Déconnexion du WebSocket
  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
      console.log('Déconnecté de WebSocket (Room)');
    }
  }

  // Récupérer les anciens messages pour une room
  getMessages(roomId: string): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`http://nexus-backend.backend.svc.cluster.local:9000/nexus-backend/msg/getRoomMessages?roomId=${roomId}`);
  }

  getRoomUsers(roomId: string): Observable<User[]> {
    return this.http.get<User[]>(`http://nexus-backend.backend.svc.cluster.local:9000/nexus-backend/chat-room/users?roomId=${roomId}`);
  }
  
}
