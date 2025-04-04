import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../../entities/game/game';
import { GameCategory } from '../../entities/game/game-category';

@Injectable({
  providedIn: 'root'
})
export class GameCategoryService {


    private gamesCategoryUrl = 'http://localhost:9000/nexus-backend/games/categories';
  
    constructor(private http: HttpClient) {}
  
    getGameCategories(): Observable<GameCategory[]> {  // ✅ Fix the return type
  
      return this.http.get<GameCategory[]>(`${this.gamesCategoryUrl}/all-categories`);
    }
  
    getGameCategory(id: number): Observable<GameCategory> {
      return this.http.get<GameCategory>(`${this.gamesCategoryUrl}/${id}`);
    }
    
    deleteGameCategory(id: number): Observable<GameCategory> {
      return this.http.delete<GameCategory>(`${this.gamesCategoryUrl}/delete/${id}`);
    }

}
