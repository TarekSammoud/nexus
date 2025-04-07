import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/core/entities/game/game';
import { GameService } from 'src/app/core/services/game/game.service';


@Component({
  selector: 'app-game-grid',
  templateUrl: './game-grid.component.html',
  styleUrls: ['./game-grid.component.scss']
})
export class GameGridComponent {

  games: Game[] = [];
  name : String = '';

  constructor(private _gameService: GameService,private route: ActivatedRoute) {
    // Initialize the component
    const category = this.route.snapshot.paramMap.get('name');
    const formattedCategory = category ? category.replace(/ /g, '_') : ''; // Handle null case
        this.name = category!;

    this._gameService.getGamesByCategory(formattedCategory!).subscribe(games => {
      this.games = games;
      console.log(this.games);
    })
  }

    

}
