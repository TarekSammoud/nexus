import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/core/entities/game/game';
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
      ,private _gameService : GameService,private _gameCategoryService: GameCategoryService, private _router: Router) {

        this._gameService.getGames().subscribe(games => {
          this.games = games;
        })

        this._gameService.getBrowserGames().subscribe(games => {
          this.browserGames = games;
          //console.log(this.browserGames);
        })

        this._gameService.getEmulatedGames().subscribe(games => {
          this.emulatedGames = games;
          //console.log(this.browserGames);
        })
       


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


    
      games: Game[] = [];
      browserGames: Game[] = [];
      emulatedGames: Game[] = [];
      name : String = '';
    
 
    
        
      OnSelect(game: Game) {
        this._router.navigate(['/games', game.id]);
        }
    
        OnSelectEmulated(game: Game){
          //console.log(game)
          this._router.navigate(['/games', game.id]);
        }

        OnSelectBrowser(game: Game){
          this._router.navigate(['/games', game.id]);
        }
  

}
