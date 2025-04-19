import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private baseUrl = 'http://localhost:9000/nexus-backend/api/likes';

  constructor(private http: HttpClient) {}

  checkIfUserLiked(userId: number, publicationId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/check?userId=${userId}&publicationId=${publicationId}`);
  }

  countLikes(publicationId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count/${publicationId}`);
  }

  addLike(data: { user: { id: number }, publication: { id: number } }): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  deleteLike(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
