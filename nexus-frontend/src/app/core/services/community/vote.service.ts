import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vote } from '../../entities/community/vote';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  private apiUrl = 'http://localhost:9000/nexus-backend/api/votes';

  constructor(private http: HttpClient) {}

  vote(sondageId: number, userId: number, voteOui: boolean): Observable<Vote> {
    const params = new HttpParams()
      .set('sondageId', sondageId.toString())
      .set('userId', userId.toString())
      .set('voteOui', voteOui.toString());

    return this.http.post<Vote>(this.apiUrl, null, { params });
  }

  countYesVotes(sondageId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count-yes/${sondageId}`);
  }


  countTotalVotes(sondageId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count-total/${sondageId}`);
  }

  hasUserVoted(sondageId: number, userId: number): Observable<boolean> {
    const params = new HttpParams()
      .set('sondageId', sondageId.toString())
      .set('userId', userId.toString());

    return this.http.get<boolean>(`${this.apiUrl}/has-voted`, { params });
  }
}
