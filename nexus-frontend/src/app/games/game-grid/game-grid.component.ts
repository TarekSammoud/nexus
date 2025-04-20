import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/app/core/entities/game/game';
import { GameService } from 'src/app/core/services/game/game.service';


@Component({
  selector: 'app-game-grid',
  templateUrl: './game-grid.component.html',
  styleUrls: ['./game-grid.component.css']
})
export class GameGridComponent {

  games: Game[] = [];
  name : String = '';

  constructor(private _router:Router,private _gameService: GameService,private route: ActivatedRoute) {
    // Initialize the component
    const category = this.route.snapshot.paramMap.get('name');
    if (category) {
      const formattedCategory = category ? category.replace(/ /g, '_') : ''; // Handle null case
      this.name = category!;

  this._gameService.getGamesByCategory(formattedCategory!).subscribe(games => {
    this.games = games;
    for (let i = 0; i < this.games.length; i++) {
      for (let j = 0; j < this.games[i].gameMediaList.length; j++) {
        if (this.games[i].gameMediaList[j].gameMediaType == 'COVER') {
          this.games[i].coverPicture = this.games[i].gameMediaList[j]; 
          console.log(this.games[i].coverPicture?.mediaUrl);
          break; 
        }
        console.log(this.games[i].coverPicture?.mediaUrl);
      }
    }
    console.log(this.games);
  })
    }
    else {
      this._gameService.getGames().subscribe(games => {
        this.games = games;
        for (let i = 0; i < this.games.length; i++) {
          for (let j = 0; j < this.games[i].gameMediaList.length; j++) {
            if (this.games[i].gameMediaList[j].gameMediaType == 'COVER') {
              this.games[i].coverPicture = this.games[i].gameMediaList[j]; 
              console.log(this.games[i].coverPicture?.mediaUrl);
              break; 
            }
            console.log(this.games[i].coverPicture?.mediaUrl);
          }
        }
        console.log(this.games);
      })
    }
  
  }

    
  OnSelect(game: Game) {
    console.log(game);
    this._router.navigate(['/games', game.id]);
    }

}
