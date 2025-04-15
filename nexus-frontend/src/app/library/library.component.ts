import { Component } from '@angular/core';
import { GameService } from '../core/services/game/game.service';
import { Game } from '../core/entities/game/game';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {
  games: Game[] = [];
  constructor(private _gameService: GameService){
    this._gameService.getUserGameLibrary().subscribe(games => {
      this.games = games;
      for (let game of this.games) {
        for (let media of game.gameMediaList) {
          if (media.gameMediaType === 'COVER') {
            game.coverPicture = media;
            break;
          }
        }

      }
      
      console.log(this.games);
    }
    );
  }

}
