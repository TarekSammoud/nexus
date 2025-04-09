import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { Client, Message } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../entities/user/user.model';

@Injectable({ providedIn: 'root' })
export class ChatService {
    private stompClient!: Client; // Correction ici
    private messageSubject = new BehaviorSubject<any>(null);
    public messages$ = this.messageSubject.asObservable();

    connect(userId: string): void {
        this.stompClient = new Client({
            brokerURL: 'ws://localhost:9000/nexus-backend/ws',
            reconnectDelay: 5000,
            webSocketFactory: () => new SockJS('http://localhost:9000/nexus-backend/ws'),
            onConnect: () => {
                this.stompClient.subscribe(`/user/${userId}/queue/messages`, (msg: Message) => {
                    this.messageSubject.next(JSON.parse(msg.body));
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


    private baseUrl = 'http://localhost:9000/nexus-backend'; // adapte à ton URL backend

    private urlgetfriend = 'http://localhost:9000/nexus-backend/users/friends';
    constructor(private http: HttpClient) { }

    getFriends(userId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.urlgetfriend}/${userId}`);
    }

}
