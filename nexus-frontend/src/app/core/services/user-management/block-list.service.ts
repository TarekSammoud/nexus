import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BlockListService {

    private baseUrl = 'http://localhost:9000/nexus-backend/user/BlockList';  // URL de l'API backend

    constructor(private http: HttpClient) { }

    // Récupérer la liste des utilisateurs bloqués
    getBlockedUsers(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/allBlockList`);
    }

    // Supprimer un utilisateur de la liste de blocage
    removeBlock(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
    }

    // Vérifier si un utilisateur est bloqué
    isUserBlocked(userId: number): Observable<boolean> {
        return this.http.get<boolean>(`${this.baseUrl}/isBlocked/${userId}`);
    }

    addBlockList(blockDetails: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/addBlockList`, blockDetails);
    }
}
