import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AvatarService {
    private apiUrl = 'http://localhost:9000/nexus-backend/api/avatar'; // URL de votre backend Spring

    constructor(private http: HttpClient) { }

    generateAvatar(request: any): Observable<any> {
        return this.http.post(this.apiUrl, request);
    }
}