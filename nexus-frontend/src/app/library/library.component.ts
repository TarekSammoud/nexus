import { Component } from '@angular/core';
import { GameService } from '../core/services/game/game.service';
import { Game } from '../core/entities/game/game';
import { GameMediaService } from '../core/services/gameMedia/game-media.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {
  games: Game[] = [];
  constructor(private _gameService: GameService, private _gameMediaService : GameMediaService){
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

  downloadFile(game : Game) {
    var type = "full";
    for (let pl of game.platforms) {
      if (pl === 'N64') {
        type = "n64";
        break; 
    }
      if (pl === 'PSP') {
        type = "psp";
        break;
      }
    }

    if (game.gameFile?.mediaUrl){
      const filename = game.gameFile?.mediaUrl;

      this._gameMediaService.downloadGameFile(type, filename).subscribe((blob) => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(objectUrl);
      }, error => {
        console.error('Download failed:', error);
      });
    }
    
  }
  

}
