import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Game } from '../../entities/game/game';
import { GameCategory } from '../../entities/game/game-category';

@Injectable({
  providedIn: 'root'
})
export class GameCategoryService {


    private gamesCategoryUrl = 'http://nexus-backend.backend.svc.cluster.local:9000/nexus-backend/games/categories';
  
    constructor(private http: HttpClient) {}
  
    getGameCategories(): Observable<GameCategory[]> {
      return this.http.get<GameCategory[]>(`${this.gamesCategoryUrl}/all-categories`).pipe(
        map(categories =>  // Remove the type annotation here, since it's inferred
          categories.map(category => ({
            ...category,
            name: category.name.replace(/_/g, ' ')  // Replace underscores with spaces
          }))
        )
      );
    }

    updateGameCategory(category: GameCategory): Observable<GameCategory> {
      return this.http.put<GameCategory>(`${this.gamesCategoryUrl}/update`, category);
    }
    
  
    getGameCategory(id: number): Observable<GameCategory> {
      return this.http.get<GameCategory>(`${this.gamesCategoryUrl}/${id}`);
    }
    
    deleteGameCategory(id: number): Observable<GameCategory> {
      return this.http.delete<GameCategory>(`${this.gamesCategoryUrl}/delete/${id}`);
    }

    createGameCategory(category: GameCategory): Observable<GameCategory> {
      return this.http.post<GameCategory>(`${this.gamesCategoryUrl}/add-category`, category);
    }

    

}
