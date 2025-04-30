import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../../entities/game/game';
import { GameReview } from '../../entities/game/game-review';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gamesUrl = 'http://localhost:9000/nexus-backend/games';

  constructor(private http: HttpClient) {}



  vncUrl: string | null = null;

playGame(romName: string): Observable<string> {
  return this.http.post(`${this.gamesUrl}/emulated/launch`, null, {
    params: { romName },
    responseType: 'text',
  });
}

playPSPGame(romName: string): Observable<string> {
  return this.http.post(`${this.gamesUrl}/emulated/launch/psp`, null, {
    params: { romName },
    responseType: 'text',
  });
}

  getGames(): Observable<Game[]> {  // ✅ Fix the return type

    return this.http.get<Game[]>(`${this.gamesUrl}/all-games`);
  }

  getDeveloperGames(id: number): Observable<Game[]> {  // ✅ Fix the return type

    return this.http.get<Game[]>(`${this.gamesUrl}/all-games/${id}`);
  }

  getBrowserGames(): Observable<Game[]> {  // ✅ Fix the return type

    return this.http.get<Game[]>(`${this.gamesUrl}/all-browser-games`);
  }

  getEmulatedGames(): Observable<Game[]> { 

    return this.http.get<Game[]>(`${this.gamesUrl}/all-emulated-games`);
  }

  getLastGameId(): Observable<number> {
    return this.http.get<number>(`${this.gamesUrl}/last-id`);
  }

  getReviews(): Observable<GameReview[]> {
    return this.http.get<GameReview[]>(`${this.gamesUrl}/reviews/all`);
  }

  addGameReview(gameReview: GameReview): Observable<GameReview> {
    return this.http.post<GameReview>(`${this.gamesUrl}/reviews/add`, gameReview);
  }

  deleteGameReview(id: number): Observable<void> {
    return this.http.delete<void>(`${this.gamesUrl}/reviews/delete/${id}`);
  }

  getGamesByCategory(category: string): Observable<Game[]> {
    console.log(category);
    return this.http.get<Game[]>(`${this.gamesUrl}/filter-by-category/${category}`);
  }

  getGame(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.gamesUrl}/${id}`);
  }

  addGame(game: Game): Observable<Game> {
    return this.http.post<Game>(`${this.gamesUrl}/add-game`, game);
  }

  updateGame(game: Game): Observable<Game> {
    return this.http.put<Game>(`${this.gamesUrl}/update-game`, game);
  }


  getNumberOfGames(): Observable<number> {
    return this.http.get<number>(`${this.gamesUrl}/number-of-games`);
  }

  deleteGame(game: Game): Observable<void> {
    return this.http.delete<void>(`${this.gamesUrl}/delete/${game.id}`);
  }

  addGameToLibrary(gameId: number): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.post(`${this.gamesUrl}/library/add/${gameId}`, null, { headers });
  }

  getUserGameLibrary(): Observable<Game[]> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  

    return this.http.get<Game[]>(`${this.gamesUrl}/library`, { headers });
  }


  
}
