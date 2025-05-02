import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameDiscount } from '../entities/game-discount';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameDiscountService {


  private gamesUrl = '/api/nexus-backend/games/discount';

  constructor(private http: HttpClient) {}



  vncUrl: string | null = null;

  updateGameDiscount(gd: GameDiscount): Observable<GameDiscount> {
  return this.http.put<GameDiscount>(`${this.gamesUrl}/update`,gd
  );
}

deleteGameDiscount(id: number): Observable<GameDiscount> {
  return this.http.delete<GameDiscount>(`${this.gamesUrl}/delete/${id}`
  );
}


createGameDiscount(gd: GameDiscount): Observable<GameDiscount> {
  return this.http.post<GameDiscount>(`${this.gamesUrl}/create`,gd
  );
}

getGameDiscount(id: number): Observable<GameDiscount> {
  return this.http.get<GameDiscount>(`${this.gamesUrl}/${id}`
  );
}

getDiscountById(id: number): Observable<GameDiscount> {
  return this.http.get<GameDiscount>(`${this.gamesUrl}/get/${id}`
  );
}

}
