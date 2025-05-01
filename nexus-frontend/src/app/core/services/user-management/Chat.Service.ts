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
        //console.log('Connexion à WebSocket...');
        this.stompClient = new Client({
            brokerURL: 'ws://nexus-backend.backend.svc.cluster.local:9000/nexus-backend/ws',
            reconnectDelay: 5000,
            webSocketFactory: () => new SockJS('http://nexus-backend.backend.svc.cluster.local:9000/nexus-backend/ws'),
            onConnect: () => {
                //console.log('Connecté à WebSocket');

                // Remplacer par l'abonnement au canal public
                this.stompClient.subscribe('/topic/public', (msg: Message) => {
                    const message: ChatMessage = JSON.parse(msg.body);
                    this.messageSubject.next(message);
                    //console.log('Message public reçu:', message);
                });
            }
            ,
            onStompError: (frame) => {
                console.error('Erreur STOMP:', frame);
            }
        });


        this.stompClient.activate(); // Activation du client WebSocket
    }

    sendMessage(senderId: number, content: string): void {
        const message = {
            senderId,
            content,
            type: 'CHAT'
        };

        if (this.stompClient.connected) {
            this.stompClient.publish({
                destination: '/app/chat.sendMessage',
                body: JSON.stringify(message),
            });
        } else {
            console.warn('WebSocket non connecté, message non envoyé.');
        }
    }



    // Déconnexion du WebSocket
    disconnect(): void {
        if (this.stompClient) {
            this.stompClient.deactivate();
            //console.log('Déconnecté de WebSocket');
        }
    }


    constructor(private http: HttpClient) { }
    getMessages(userId: number): Observable<ChatMessage[]> {
        return this.http.get<ChatMessage[]>(`http://nexus-backend.backend.svc.cluster.local:9000/nexus-backend/msg/getMessages?userId=${userId}`);
    }
}