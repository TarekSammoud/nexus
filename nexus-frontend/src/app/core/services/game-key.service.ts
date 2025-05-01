import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameKey } from '../entities/game-key';

@Injectable({
  providedIn: 'root'
})
export class GameKeyService {
  private gamesUrl = 'http://nexus-backend.backend.svc.cluster.local:9000/nexus-backend/games/game-keys';

  constructor(private http: HttpClient) { }

  getGameKeys(): Observable<any[]> {
    return this.http.get<any[]>(`${this.gamesUrl}/all`);
  }
  getGameKey(id: number): Observable<any> {
    return this.http.get<any>(`${this.gamesUrl}/${id}`);
  }
  addGameKey(gameKey: GameKey): Observable<any> {
    return this.http.post<any>(`${this.gamesUrl}/add`, gameKey);
  }

  deleteGameKey(gameKey: GameKey): Observable<any> {
    return this.http.delete<any>(`${this.gamesUrl}/delete/${gameKey.id}`);
  }

  redeemGameKey(gameKey: GameKey): Observable<boolean> {
    return this.http.post<boolean>(`${this.gamesUrl}/redeem/${gameKey.keyCode}`,null);
  }
}
