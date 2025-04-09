import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class FriendRequestService {

    private apiUrl = `http://localhost:9000/nexus-backend/friendRequests/players/available`; // Assure-toi que l'URL est correcte

    constructor(private http: HttpClient) { }

    getAvailablePlayers(userId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/${userId}`);
    }

    sendFriendRequest(senderId: number, recipientId: number): Observable<any> {
        const url = `http://localhost:9000/nexus-backend/friendRequests/addFriendRequest`;
        const requestPayload = {
            sender: { id: senderId },
            recipient: { id: recipientId }
        };
        return this.http.post<any>(url, requestPayload);
    }

    getReceivedFriendRequests(userId: number): Observable<any[]> {
        const url = `http://localhost:9000/nexus-backend/friendRequests/received/${userId}`;
        return this.http.get<any[]>(url);
    }


    acceptFriendRequest(requestId: number): Observable<any> {
        return this.http.put(`http://localhost:9000/nexus-backend/friendRequests/accept/${requestId}`, {});
    }

    //put
    rejectFriendRequest(requestId: number): Observable<any> {
        return this.http.put(`http://localhost:9000/nexus-backend/friendRequests/reject/${requestId}`, {});
    }


    private baseUrl = 'http://localhost:9000/nexus-backend/user';

    getFriends(userId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/friends/${userId}`);
    }


}
