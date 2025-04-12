import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { Client, Message } from '@stomp/stompjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChatMessage } from '../../entities/user/ChatMessage';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    private stompClient: Client;
    private messagesSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    public messages$ = this.messagesSubject.asObservable();

    constructor(private http: HttpClient) {
        // Initialisation du client STOMP
        this.stompClient = new Client({
            webSocketFactory: () => new SockJS('http://localhost:9000/nexus-backend/ws'),  // URL du WebSocket (Spring backend)
            connectHeaders: {},
            debug: (str) => {
                console.log(str); // Pour voir les logs de connexion
            },
            onConnect: (frame) => {
                console.log('WebSocket connecté', frame);
                // L'ID d'utilisateur est passé ici pour l'abonnement
                this.stompClient.subscribe(`/user/queue/messages`, (message: Message) => {
                    if (message.body) {
                        const chatMessage = JSON.parse(message.body);
                        this.messagesSubject.next(chatMessage);
                    }
                });
            },
            onDisconnect: () => {
                console.log('WebSocket déconnecté');
            },
        });
    }

    // Connexion au WebSocket
    connect(userId: number): void {
        // Pour STOMP version 6.x et supérieur
        if (!this.stompClient.connected) {
            this.stompClient.activate();
        }
    }

    // Envoi d'un message via WebSocket
    sendMessage(senderId: number, recipientId: number, content: string): void {
        const message = {
            senderId,
            recipientId,
            content,
            type: 'CHAT',
        };

        // Vérifie que le client STOMP est bien connecté
        if (this.stompClient.connected) {
            this.stompClient.publish({
                destination: '/app/chat.sendMessage',
                body: JSON.stringify(message),
            });
        } else {
            console.warn('WebSocket non connecté, message non envoyé.');
        }
    }

    getMessages(userId: number): Observable<ChatMessage[]> {
        return this.http.get<ChatMessage[]>(`/api/messages/${userId}`);  // L'URL doit être correcte selon ton backend
    }

}
