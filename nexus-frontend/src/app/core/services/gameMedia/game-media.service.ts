import { Injectable } from '@angular/core';
import { GameMedia } from '../../entities/game/game-media';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameMediaService {
  private gamesUrl = 'http://localhost:9000/nexus-backend/games/media';

  private ftpUrl= 'http://localhost:9000/nexus-backend/games/upload'; 

  constructor(private http: HttpClient) {}

  getGames(): Observable<GameMedia[]> {  // ✅ Fix the return type

    return this.http.get<GameMedia[]>(`${this.gamesUrl}/all`);
  }

  getGame(id: number): Observable<GameMedia> {
    return this.http.get<GameMedia>(`${this.gamesUrl}/${id}`);
  }

  addGameMedia(gameMedia: any): Observable<GameMedia> {
    return this.http.post<GameMedia>(`${this.gamesUrl}/add`, gameMedia);
  }
  

  uploadFileToFtp(file: any): Observable<String> {
    return this.http.post<String>(this.ftpUrl,file);
  }
}
