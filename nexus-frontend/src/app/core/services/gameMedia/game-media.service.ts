import { Injectable } from '@angular/core';
import { GameMedia } from '../../entities/game/game-media';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameMediaService {
  private gamesUrl = 'http://localhost:9000/nexus-backend/games/media';
  private ftpUrl = 'http://localhost:9000/nexus-backend/games/upload';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');  // or sessionStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getGames(): Observable<GameMedia[]> {
    return this.http.get<GameMedia[]>(`${this.gamesUrl}/all`, {
      headers: this.getAuthHeaders()
    });
  }

  getGame(id: number): Observable<GameMedia> {
    return this.http.get<GameMedia>(`${this.gamesUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  createZip(formData: FormData): Observable<any> {
    return this.http.post(`${this.ftpUrl}/rar`, formData, {
      headers: this.getAuthHeaders()
    });
  }

  addGameMedia(gameMedia: any): Observable<GameMedia> {
    return this.http.post<GameMedia>(`${this.gamesUrl}/add`, gameMedia, {
      headers: this.getAuthHeaders()
    });
  }

  uploadFileToFtp(file: any): Observable<String> {
    return this.http.post<String>(this.ftpUrl, file, {
      headers: this.getAuthHeaders()
    });
  }
}
