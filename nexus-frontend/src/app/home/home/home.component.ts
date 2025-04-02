import { Component, ElementRef, ViewChild } from '@angular/core';
import { GameCategory } from 'src/app/core/entities/game/game-category';
import { GameService } from 'src/app/core/services/game/game.service';
import { GameCategoryService } from 'src/app/core/services/gameCategory/game-category.service';
import { GameMediaService } from 'src/app/core/services/gameMedia/game-media.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  availableCategories!: GameCategory[];

    constructor(private _gameMediaService: GameMediaService
      ,private _gameService : GameService,private _gameCategoryService: GameCategoryService) {
      this._gameCategoryService.getGameCategories().subscribe((data) => {
        this.availableCategories = data.map((category) => {
          return {
            id: category.id,
            name: category.name,
            description: category.description
          };
        });
      });
  

  
    }

    goToPage(category: GameCategory) {
      // Navigate to the game grid page with the selected category
      window.location.href = `/category/${category.name}`;
    }

    @ViewChild('chipContainer', { static: false }) chipContainer!: ElementRef;


    scrollLeft() {
      this.chipContainer.nativeElement.scrollBy({ left: -100, behavior: 'smooth' });
    }
  
    scrollRight() {
      this.chipContainer.nativeElement.scrollBy({ left: 100, behavior: 'smooth' });
    }
  

}
