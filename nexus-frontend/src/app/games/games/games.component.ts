import { Component } from '@angular/core';
import { Game } from 'src/app/core/entities/game/game';
import { GameService } from 'src/app/core/services/game/game.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent {

  Games? : Game[];
  constructor(private gameService: GameService) {
    this.gameService.getGames().subscribe(games => {
      this.Games = games; // Assign the fetched array directly
    });
  }

}
