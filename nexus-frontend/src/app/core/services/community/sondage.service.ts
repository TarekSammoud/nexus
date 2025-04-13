import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sondage } from '../../entities/community/sondage';

@Injectable({
  providedIn: 'root'
})
export class SondageService {
  private apiUrl = 'http://localhost:9000/nexus-backend/api/sondages';

  constructor(private http: HttpClient) {}

  getAllSondages(): Observable<Sondage[]> {
    return this.http.get<Sondage[]>(this.apiUrl);
  }

  getSondageById(id: number): Observable<Sondage> {
    return this.http.get<Sondage>(`${this.apiUrl}/${id}`);
  }

  createSondage(sondage: Partial<Sondage>): Observable<Sondage> {
    return this.http.post<Sondage>(`${this.apiUrl}/create`, sondage);
  }
  

  deleteSondage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  approveSondage(id: number): Observable<Sondage> {
    return this.http.put<Sondage>(`${this.apiUrl}/${id}/approve`, {});
  }

  startLive(sondageId: number, liveUrl: string): Observable<Sondage> {
    return this.http.put<Sondage>(`${this.apiUrl}/${sondageId}/start-live`, liveUrl, {
      headers: { 'Content-Type': 'text/plain' }
    });
  }
  

  
}
