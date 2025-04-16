import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';

import { Publication } from '../../entities/community/publication';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  private baseUrl = 'http://localhost:9000/nexus-backend/api/publications';

  constructor(private http: HttpClient) {}

  getPublications(): Observable<Publication[]> {
    console.log('➡️ Requête envoyée vers :', `${this.baseUrl}/all`);
    return this.http.get<Publication[]>(`${this.baseUrl}/all`).pipe(
      tap((data) => console.log('✅ Données reçues dans le Service:', data)),
      catchError((error) => {
        console.error('❌ Erreur dans le service:', error);
        return throwError(error);
      })
    );
  }


  getPublication(id: number): Observable<Publication> {
    return this.http.get<Publication>(`${this.baseUrl}/${id}`);
  }

  createPublication(publication: Publication): Observable<Publication> {
    return this.http.post<Publication>(this.baseUrl, publication);
  }

  updatePublication(id: number, publication: Publication): Observable<Publication> {
    return this.http.put<Publication>(`${this.baseUrl}/${id}`, publication);
  }

  deletePublication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getPublicationById(id: number): Observable<Publication> {
    return this.http.get<Publication>(`${this.baseUrl}/${id}`);
  }
  

  getPublicationsVisibles(): Observable<Publication[]> {
    return this.http.get<Publication[]>(`${this.baseUrl}/visibles`);
  }
  

  getPublicationStatsByCategory(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(
      `${this.baseUrl}/stats/category`
    );
  }
  
  
  
  


}
