import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { Client, Message } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {
    private stompClient!: Client;
    private messageSubject = new BehaviorSubject<any>(null);
    public messages$ = this.messageSubject.asObservable();

    connect(userId: string): void {
        this.stompClient = new Client({
            brokerURL: 'ws://localhost:9000/nexus-backend/ws',
            reconnectDelay: 5000,
            webSocketFactory: () => new SockJS('http://localhost:9000/nexus-backend/ws'),
            onConnect: () => {
                // Souscrire au canal des messages de l'utilisateur
                this.stompClient.subscribe(`/user/${userId}/queue/messages`, (msg: Message) => {
                    this.messageSubject.next(JSON.parse(msg.body)); // Diffuser le message reçu
                });
            }
        });

        this.stompClient.activate();
    }

    sendMessage(senderId: string, recipientId: string, content: string): void {
        const message = { senderId, recipientId, content };
        this.stompClient.publish({
            destination: '/app/chat.sendMessage',
            body: JSON.stringify(message)
        });
    }
}
