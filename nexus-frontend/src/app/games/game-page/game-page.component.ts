import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/core/entities/game/game';
import { GameMedia } from 'src/app/core/entities/game/game-media';
import { GameService } from 'src/app/core/services/game/game.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent {
  game? : Game;

  constructor(private _gameService: GameService, private route: ActivatedRoute) {
    const gameId = this.route.snapshot.paramMap.get('id'); // Get ID from URL
    if (gameId) {
      this._gameService.getGame(+gameId).subscribe(game => {
        this.game = game;
      });
    }
  }
  chunkArray(arr: GameMedia[] | undefined, size: number): GameMedia[][] {
    if (!arr || arr.length === 0) return [];
    return arr.reduce(
      (acc, _, i) => (i % size === 0 ? [...acc, arr.slice(i, i + size)] : acc),
      [] as GameMedia[][]
    );
  }
  
  

}
