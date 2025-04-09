import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/app/core/entities/game/game';
import { GameMedia } from 'src/app/core/entities/game/game-media';
import { GameReview } from 'src/app/core/entities/game/game-review';
import { GameService } from 'src/app/core/services/game/game.service';
declare var bootstrap: any;
@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {
  game! : Game;
  groupedReviews: GameReview[][] = [];


  ngOnInit(): void {
   
  }

  
groupReviews(reviews: GameReview[], perGroup: number): GameReview[][] {
  const result: GameReview[][] = [];
  for (let i = 0; i < reviews.length; i += perGroup) {
    result.push(reviews.slice(i, i + perGroup));
  }
  return result;
}

reviewForm: FormGroup;

  constructor(private fb: FormBuilder,private _gameService: GameService, private _router:Router,private route: ActivatedRoute) {
    const gameId = this.route.snapshot.paramMap.get('id'); // Get ID from URL
    if (gameId) {
      this._gameService.getGame(+gameId).subscribe(game => {
        this.game = game;
        if (this.game?.gameReviewList) {
          this.groupedReviews = this.groupReviews(this.game.gameReviewList, 3);
        }
        this.game.screenshots = []; // ✅ Initialize

        for (let media of this.game.gameMediaList) {
          if (media.gameMediaType === 'SCREENSHOT') {
            this.game.screenshots.push(media);
          }
        }
      
        console.log(this.game.screenshots); 
      });
    }
    this.reviewForm = this.fb.group({
      game: this.fb.group({
        id: [this.game?.id]
      }),
      user: this.fb.group({
        id: [1] 
      }),
      reviewText: ['', [Validators.required, Validators.minLength(10)]],
      rating: [0, Validators.required]
    });
  }

  activeIndex: number = 0;

  onSubmit() {
    console.log(this.reviewForm.value);
    this.reviewForm.value.game.id = this.game?.id; // Set the game ID in the form value
    if (this.reviewForm.valid) {
      console.log('Review submitted:', this.reviewForm.value);
      this._gameService.addGameReview(this.reviewForm.value).subscribe((response) => {
        console.log('Review added successfully:', response);
        this.reviewForm.reset();
      });
    } else {
      this.reviewForm.markAllAsTouched();
    }
  }

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
prevSlide() {
  if (this.activeIndex > 0) {
    this.activeIndex--;
  } else {
    this.activeIndex = (this.game?.screenshots!.length || 0) - 1;
  }
}

nextSlide() {
  if (this.activeIndex < this.game?.screenshots!.length - 1) {
    this.activeIndex++;
  } else {
    this.activeIndex = 0;
  }
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
