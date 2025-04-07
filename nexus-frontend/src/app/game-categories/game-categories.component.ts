import { Component } from '@angular/core';
import { GameCategory } from 'src/app/core/entities/game/game-category';
import { GameCategoryService } from '../core/services/gameCategory/game-category.service';

@Component({
  selector: 'app-game-categories',
  templateUrl: './game-categories.component.html',
  styleUrls: ['./game-categories.component.css']
})
export class GameCategoriesComponent {
  availableCategories: GameCategory[] = [];
  constructor(private _gameCategoryService: GameCategoryService) {
    this._gameCategoryService.getGameCategories().subscribe((data) => {
      this.availableCategories = data;
    });
  }

  deleteGameCategory(id: number) {
    this._gameCategoryService.deleteGameCategory(id).subscribe((data) => {
      this.availableCategories = this.availableCategories.filter(category => category.id !== id);
    });
  }
}


