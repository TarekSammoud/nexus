import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpamCheckService {


  private apiUrl = 'http://localhost:9000/nexus-backend/games/reviews/check';  // Your Spring Boot endpoint

  constructor(private http: HttpClient) { }

  checkReview(reviewText: string): Observable<any> {
    const body = { reviewText: reviewText };
    return this.http.post<any>(this.apiUrl, body);
  }

}
