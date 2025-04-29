import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../entities/user/user.model';

@Injectable({
    providedIn: 'root'
})
export class FriendRequestService {
    private baseUrl = 'http://localhost:9000/nexus-backend';

    constructor(private http: HttpClient) { }

    getAvailablePlayers(userId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/friendRequests/players/available/${userId}`);
    }

    sendFriendRequest(senderId: number, recipientId: number): Observable<any> {
        const url = `${this.baseUrl}/friendRequests/addFriendRequest`;
        const payload = {
            sender: { id: senderId },
            recipient: { id: recipientId }
        };
        return this.http.post<any>(url, payload);
    }

    getReceivedFriendRequests(userId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/friendRequests/received/${userId}`);
    }

    acceptFriendRequest(requestId: number): Observable<any> {
        return this.http.put(`${this.baseUrl}/friendRequests/accept/${requestId}`, {});
    }

    rejectFriendRequest(requestId: number): Observable<any> {
        return this.http.put(`${this.baseUrl}/friendRequests/reject/${requestId}`, {});
    }

    getFriends(userId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/user/friends/${userId}`);
    }

    getRecommendedFriends(userId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/friendRequests/recommendations2/${userId}`);
    }

    removeFriend(userId1: number, userId2: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/friendRequests/remove/${userId1}/${userId2}`);
    }
}
