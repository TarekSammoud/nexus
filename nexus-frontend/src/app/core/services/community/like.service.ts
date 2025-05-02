import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private baseUrl = '/api/nexus-backend/api/likes';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');  // Récupérer le token depuis localStorage
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);  // Ajouter le token dans les en-têtes
    }

    return headers;
  }

  // Vérifier si un utilisateur a aimé une publication
  checkIfUserLiked(userId: number, publicationId: number): Observable<boolean> {
    const headers = this.getHeaders();  // Ajouter les headers avec le token
    return this.http.get<boolean>(`${this.baseUrl}/check?userId=${userId}&publicationId=${publicationId}`, { headers });
  }

  // Compter le nombre de likes sur une publication
  countLikes(publicationId: number): Observable<number> {
    const headers = this.getHeaders();  // Ajouter les headers avec le token
    return this.http.get<number>(`${this.baseUrl}/count/${publicationId}`, { headers });
  }

  // Ajouter un like à une publication
  addLike(data: { user: { id: number }, publication: { id: number } }): Observable<any> {
    const headers = this.getHeaders();  // Ajouter les headers avec le token
    return this.http.post(`${this.baseUrl}`, data, { headers });
  }

  deleteLike(id: number): Observable<void> {
    const headers = this.getHeaders();  // Ajouter les headers avec le token
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers });
  }
}
