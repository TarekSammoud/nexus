import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  getGamesByCategory(category: string): Observable<Game[]> {
    // Creating query parameters to pass the category
   // const params = new HttpParams().set('name', category);

    // Sending GET request with the category name as query parameter filter-by-category
    return this.http.get<Game[]>(`${this.gamesUrl}/filter-by-category/${category}`);
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

  deleteGame(game: Game): Observable<void> {
    return this.http.delete<void>(`${this.gamesUrl}/delete/${game.id}`);
  }
}
