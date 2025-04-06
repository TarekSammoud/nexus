import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private _gameService: GameService, private _router:Router,private route: ActivatedRoute) {
    const gameId = this.route.snapshot.paramMap.get('id'); // Get ID from URL
    if (gameId) {
      this._gameService.getGame(+gameId).subscribe(game => {
        this.game = game;
        this.game.screenshots = []; // ✅ Initialize

        for (let media of this.game.gameMediaList) {
          if (media.gameMediaType === 'SCREENSHOT') {
            this.game.screenshots.push(media);
          }
        }
      
        console.log(this.game.screenshots); // ✅ Now it's safe
      });
    }
  }

  activeIndex: number = 0;

changeSlide(index: number): void {
  this.activeIndex = index;
  // Use the carousel instance API to navigate to the desired slide
}

setActiveSlide(index: number): void {
  console.log("Setting active slide to: " + index);
  this.activeIndex = index; // Set the active index

  // Update the carousel to show the active slide
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

  deleteGame(game: Game){
    if (confirm("Are you sure you want to delete this game?")) {
      this._gameService.deleteGame(game).subscribe(() => {
        alert("Game deleted successfully");
        window.location.href = '/home';
      }, error => {
        alert("Error deleting game: " + error.message);
      });
    }
  }

  navigateToUpdate(game: Game) {
    // Navigate to the update game page with the selected game ID
    this._router.navigate(['/update-game', game.id]);
  }
  
  

}
