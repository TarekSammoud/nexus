import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/core/entities/game/game';
import { GameMedia } from 'src/app/core/entities/game/game-media';
import { GameService } from 'src/app/core/services/game/game.service';
declare var bootstrap: any;
@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent {
  game! : Game;

  constructor(private _gameService: GameService, private route: ActivatedRoute) {
    const gameId = this.route.snapshot.paramMap.get('id'); // Get ID from URL
    if (gameId) {
      this._gameService.getGame(+gameId).subscribe(game => {
        this.game = game;
      });
    }
  }

  activeIndex: number = 0;

changeSlide(index: number): void {
  this.activeIndex = index;
  // Use the carousel instance API to navigate to the desired slide
}

setActiveSlide(index: number): void {
  const carousel = document.querySelector('#carouselExample');
  const carouselInstance = bootstrap.Carousel.getInstance(carousel);
  carouselInstance.to(index);
}

  chunkArray(arr: GameMedia[] | undefined, size: number): GameMedia[][] {
    if (!arr || arr.length === 0) return [];
    return arr.reduce(
      (acc, _, i) => (i % size === 0 ? [...acc, arr.slice(i, i + size)] : acc),
      [] as GameMedia[][]
    );
  }
  
  

}
