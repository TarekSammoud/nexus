import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sondage } from '../../entities/community/sondage';

@Injectable({
  providedIn: 'root'
})
export class SondageService {
  private apiUrl = 'http://localhost:8080/api/sondages';

  constructor(private http: HttpClient) {}

  getAllSondages(): Observable<Sondage[]> {
    return this.http.get<Sondage[]>(this.apiUrl);
  }

  getSondageById(id: number): Observable<Sondage> {
    return this.http.get<Sondage>(`${this.apiUrl}/${id}`);
  }

  createSondage(sondage: Sondage): Observable<Sondage> {
    return this.http.post<Sondage>(`${this.apiUrl}/create`, sondage);
  }

  deleteSondage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
