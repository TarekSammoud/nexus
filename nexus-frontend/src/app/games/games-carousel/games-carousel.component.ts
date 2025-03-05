import { Component, OnInit } from '@angular/core';
import { CarouselModule } from '@syncfusion/ej2-angular-navigations'
import { Game } from 'src/app/core/entities/game/game';
import { GameService } from 'src/app/core/services/game/game.service';

@Component({
  selector: 'app-games-carousel',
  templateUrl: './games-carousel.component.html',
  styleUrls: ['./games-carousel.component.css']
})
export class GamesCarouselComponent implements OnInit{

    Games? : Game[];
    constructor(private gameService: GameService) {
      this.gameService.getGames().subscribe(games => {
        this.Games = games; 
      });

    }
    ngOnInit(): void {
      console.log(this.Games);
    }

}
