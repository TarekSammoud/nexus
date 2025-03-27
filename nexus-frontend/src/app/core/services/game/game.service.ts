import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../../entities/game/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gamesUrl = 'http://localhost:9000/nexus-backend/games';

  constructor(private http: HttpClient) {}

  getGames(): Observable<Game[]> {  // ✅ Fix the return type

    return this.http.get<Game[]>(`${this.gamesUrl}/all-games`);
  }

  getGame(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.gamesUrl}/${id}`);
  }

  addGame(game: Game): Observable<Game> {
    return this.http.post<Game>(`${this.gamesUrl}/add-game`, game);
  }

  getNumberOfGames(): Observable<number> {
    return this.http.get<number>(`${this.gamesUrl}/number-of-games`);
  }
}
