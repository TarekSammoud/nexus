import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vote } from '../../entities/community/vote';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  private apiUrl = 'http://localhost:9000/nexus-backend/api/votes';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');  
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);  
    }

    return headers;
  }

  vote(sondageId: number, userId: number, voteOui: boolean): Observable<Vote> {
    const token = localStorage.getItem('auth_token');  
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
  
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);  
    }
  
    const params = new HttpParams()
      .set('sondageId', sondageId.toString())
      .set('userId', userId.toString())
      .set('voteOui', voteOui.toString());
      console.log(userId);
  
    return this.http.post<Vote>(this.apiUrl, null, { params, headers });
  }
  

  countYesVotes(sondageId: number): Observable<number> {
    const headers = this.getAuthHeaders();  
    return this.http.get<number>(`${this.apiUrl}/count-yes/${sondageId}`, { headers });
  }

  countTotalVotes(sondageId: number): Observable<number> {
    const headers = this.getAuthHeaders();  
    return this.http.get<number>(`${this.apiUrl}/count-total/${sondageId}`, { headers });
  }

  hasUserVoted(sondageId: number, userId: number): Observable<boolean> {
    const params = new HttpParams()
      .set('sondageId', sondageId.toString())
      .set('userId', userId.toString());

    const headers = this.getAuthHeaders();  
    return this.http.get<boolean>(`${this.apiUrl}/has-voted`, { params, headers });
  }
}
