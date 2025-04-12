import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { Client, Message } from '@stomp/stompjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChatMessage } from '../../entities/user/ChatMessage';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ChatService {
    private stompClient!: Client;
    private messageSubject = new BehaviorSubject<any>(null);
    public messages$ = this.messageSubject.asObservable();

    // Connexion WebSocket
    connect(userId: number): void {
        console.log('Connexion à WebSocket...');
        this.stompClient = new Client({
            brokerURL: 'ws://localhost:9000/nexus-backend/ws', // URL complète du broker WebSocket
            reconnectDelay: 5000, // Tentatives de reconnexion
            webSocketFactory: () => new SockJS('http://localhost:9000/nexus-backend/ws'), // Factory pour SockJS
            onConnect: () => {
                console.log('Connecté à WebSocket');
                this.stompClient.subscribe(`/user/${userId}/queue/messages`, (msg: Message) => {
                    const message: ChatMessage = JSON.parse(msg.body); // Traitement du message reçu
                    this.messageSubject.next(message); // Diffusion du message reçu
                    console.log('Message reçu:', message);
                });
            },
            onStompError: (frame) => {
                console.error('Erreur de STOMP:', frame);
            }
        });

        this.stompClient.activate(); // Activation du client WebSocket
    }

    sendMessage(senderId: number, recipientId: number, content: string): void {
        const message = new ChatMessage(senderId, recipientId, content);
        console.log(`Envoi du message de ${senderId} à ${recipientId}: ${content}`);
        this.stompClient.publish({
            destination: '/app/chat.sendMessage', // Destination pour l'envoi
            body: JSON.stringify(message) // Conversion du message en JSON
        });
    }

    // Déconnexion du WebSocket
    disconnect(): void {
        if (this.stompClient) {
            this.stompClient.deactivate();
            console.log('Déconnecté de WebSocket');
        }
    }


    constructor(private http: HttpClient) { }
    getMessages(userId: number): Observable<ChatMessage[]> {
        return this.http.get<ChatMessage[]>(`http://localhost:9000/nexus-backend/msg/getMessages?userId=${userId}`);
    }
}
