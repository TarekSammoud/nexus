import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { TokenService } from 'src/app/core/services/user-management/token.service';  


import { Publication } from '../../entities/community/publication';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  private baseUrl = 'http://localhost:9000/nexus-backend/api/publications';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token'); // Récupérer le token du localStorage
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);  // Ajouter le token dans l'en-tête
    }
    return headers;
  }



  getPublications(): Observable<Publication[]> {
    console.log('➡️ Requête envoyée vers :', `${this.baseUrl}/all`);
    return this.http.get<Publication[]>(`${this.baseUrl}/all`, { headers: this.getHeaders() }).pipe(
      tap((data) => console.log('✅ Données reçues dans le Service:', data)),
      catchError((error) => {
        console.error('❌ Erreur dans le service:', error);
        return throwError(error);
      })
    );
  }


  getPublication(id: number): Observable<Publication> {
    return this.http.get<Publication>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  createPublication(publication: Publication): Observable<Publication> {
    return this.http.post<Publication>(this.baseUrl, publication, { headers: this.getHeaders() });
  }

  updatePublication(id: number, publication: Publication): Observable<Publication> {
    return this.http.put<Publication>(`${this.baseUrl}/${id}`, publication, { headers: this.getHeaders() });
  }

  deletePublication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }


  getPublicationById(id: number): Observable<Publication> {
    return this.http.get<Publication>(`${this.baseUrl}/${id}`);
  }
  

  getPublicationsVisibles(headers: HttpHeaders): Observable<Publication[]> {
    console.log('➡️ Requête envoyée vers :', `${this.baseUrl}/visibles`);
    return this.http.get<Publication[]>(`${this.baseUrl}/visibles`, { headers }).pipe(
      tap((data) => console.log('✅ Données reçues dans getPublicationsVisibles:', data)),
      catchError((error) => {
        console.error('❌ Erreur dans getPublicationsVisibles:', error);
        return throwError(() => error);
      })
    );
  }
  
  

  getPublicationStatsByCategory(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.baseUrl}/stats/category`, { headers: this.getHeaders() });
  }

  uploadImage(formData: FormData): Observable<string> {
    return this.http.post(`${this.baseUrl}/upload`, formData, { responseType: 'text', headers: this.getHeaders() });
  }


}
