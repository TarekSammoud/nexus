import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sondage } from '../../entities/community/sondage';
import { TokenService } from '../user-management/token.service'; 
import { Streamer } from 'src/app/core/entities/community/streamer';



@Injectable({
  providedIn: 'root'
})
export class SondageService {
  private apiUrl = 'http://localhost:9000/nexus-backend/api/sondages';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');  
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);  
    }

    return headers;
  }

  getAllSondages(): Observable<Sondage[]> {
    const headers = this.getAuthHeaders();  
    return this.http.get<Sondage[]>(this.apiUrl, { headers });
  }

  getSondageById(id: number): Observable<Sondage> {
    const headers = this.getAuthHeaders(); 
    return this.http.get<Sondage>(`${this.apiUrl}/${id}`, { headers });
  }

  createSondage(sondage: Partial<Sondage>): Observable<Sondage> {
    const headers = this.getAuthHeaders(); 
    return this.http.post<Sondage>(`${this.apiUrl}/create`, sondage, { headers });
  }

  deleteSondage(id: number): Observable<void> {
    const headers = this.getAuthHeaders();  
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  approveSondage(id: number, endDate: string): Observable<any> {
    const headers = this.getAuthHeaders();  
    return this.http.put(`${this.apiUrl}/approve/${id}`, { endDate }, { headers });
  }

  startLive(sondageId: number, liveUrl: string): Observable<Sondage> {
    const headers = this.getAuthHeaders();
  
    const headersWithContentType = headers.set('Content-Type', 'text/plain');
  
    return this.http.put<Sondage>(`${this.apiUrl}/${sondageId}/start-live`, liveUrl, {
      headers: headersWithContentType
    });
  }


  getTopStreamers(): Observable<Streamer[]> {
    return this.http.get<Streamer[]>(`${this.apiUrl}/top-streamers`);
  }
  

  
}
