import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Game } from 'src/app/core/entities/game/game';
import { GameMedia } from 'src/app/core/entities/game/game-media';
import { GamePlatform } from 'src/app/core/entities/game/game-platform.enum';
import { GameReview } from 'src/app/core/entities/game/game-review';
import { GameService } from 'src/app/core/services/game/game.service';
import { GameMediaService } from 'src/app/core/services/gameMedia/game-media.service';
import { SpamCheckService } from 'src/app/core/services/spam-check.service';
import { MetamaskService } from 'src/services/finance/metamask.service';
import { NotificationService } from 'src/services/finance/notification.service';
import { PanierService } from 'src/services/finance/panier.service';
declare var bootstrap: any;
@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {
  game! : Game;
  groupedReviews: GameReview[][] = [];
  browser: string ='BROWSER';
  n64: string ='N64';
  psp: string ='N64';
  matchesPlatform: boolean = false;
  matchesPlatformEmulated: boolean = false;
  matchesPlatformPSP: boolean = false;

  OnSelectBrowser(game: Game){
    var url = game.gameFile?.mediaUrl?.replace(/\.zip$/, '');
    this._router.navigate(['/games/play', url]);
  }

  OnSelectEmulated(game: Game){
    this._router.navigate(['/games/emulated/play', game.gameFile?.mediaUrl]);
  }

  

  emulatedGame= false;
  emulatedPSPGame= false;
  ngOnInit(): void {
    this.metamaskService.connectWallet();
    
    
    if (this.gameId) {
      this._gameService.getGame(+this.gameId).subscribe(game => {
        this.game = game;
        for (let platform of game.platforms) {
          this.gamePlatforms.push(platform);
        }

         this.matchesPlatform = !this.browser || 
        game.platforms?.includes(this.browser);

        this.matchesPlatformEmulated = !this.n64 || 
        game.platforms?.includes(this.n64);

    for ( let platform of this.game.platforms) {
      if (platform == "BROWSER") {
        this.browserGame = true ;
        console.log(this.browserGame)
      }

      if (platform == "N64") {
        this.emulatedGame = true ;
        console.log(this.emulatedGame)
      }

      if (platform == "PSP") {
        this.emulatedPSPGame = true ;
        console.log(this.emulatedPSPGame)
      }
    }
        
        if (this.game?.gameReviewList) {
          this.groupedReviews = this.groupReviews(this.game.gameReviewList, 3);
        }

        this._gameService.getUserGameLibrary().subscribe(games => {
          for (let game of games) {
            if (game.id === this.game?.id) {
              this.inLibrary = true;
              console.log(this.inLibrary);
              break;
            }
          }
        });
    
      
      });

      



    }


   
  }
  addGameToCart(item: Game) {
      if (item.gameDiscount){
        if (item.gameDiscount.discountPercentage)
        item.price = item.price - (item.price * item.gameDiscount.discountPercentage / 100)
      }
    
    this.panierService.addItemToCart(item);
    this._router.navigate(['/category',item.categories[0].name]);
    
    
    if (this.gameId) {
      this._gameService.getGame(+this.gameId).subscribe(game => {
        this.game = game;
        for (let platform of game.platforms) {
          this.gamePlatforms.push(platform);
        }

         this.matchesPlatform = !this.browser || 
        game.platforms?.includes(this.browser);

        this.matchesPlatformEmulated = !this.n64 || 
        game.platforms?.includes(this.n64);

    for ( let platform of this.game.platforms) {
      if (platform == "BROWSER") {
        this.browserGame = true ;
        console.log(this.browserGame)
      }

      if (platform == "N64") {
        this.emulatedGame = true ;
        console.log(this.emulatedGame)
      }

      if (platform == "PSP") {
        this.emulatedPSPGame = true ;
        console.log(this.emulatedPSPGame)
      }
    }
        
        if (this.game?.gameReviewList) {
          this.groupedReviews = this.groupReviews(this.game.gameReviewList, 3);
        }

        this._gameService.getUserGameLibrary().subscribe(games => {
          for (let game of games) {
            if (game.id === this.game?.id) {
              this.inLibrary = true;
              console.log(this.inLibrary);
              break;
            }
          }
        });
    
      
      });

      



    }


   
  }
  
groupReviews(reviews: GameReview[], perGroup: number): GameReview[][] {
  const result: GameReview[][] = [];
  for (let i = 0; i < reviews.length; i += perGroup) {
    result.push(reviews.slice(i, i + perGroup));
  }
  return result;
}

reviewForm: FormGroup;
inLibrary = false ; 
bannerUrl: string = '';
browserGame = false; 
 gameId: number | any;
 gamePlatforms: String[] = [];

  constructor(private panierService: PanierService,
    private _spamCheckService: SpamCheckService,private fb: FormBuilder,
    private _gameService: GameService, private _router:Router,private route: ActivatedRoute,
    private metamaskService: MetamaskService,
        private notificationService: NotificationService,
        private _gameMediaService :GameMediaService
    
  
  ) {
    const gameId = this.route.snapshot.paramMap.get('id'); // Get ID from URL

     this.gameId = this.route.snapshot.paramMap.get('id'); // Get ID from URL
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
  isGenerated= false;
  isLoading = true;
  errorMessage = '';
  response: any = null;  // Store the response from the backend


  onSubmit() {
    this._spamCheckService.checkReview(this.reviewForm.value.reviewText).subscribe(
      (response) => {
        this.isLoading = false;
        this.response = response;
        if (response.label === 'CG') {
          this.isGenerated = true;
          this.errorMessage = 'The review is generated by AI. Please write a genuine review.';
        }
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = "There was an error checking the review. Please try again.";
      }
    );

    this.reviewForm.value.game.id = this.game?.id; // Set the game ID in the form value
    if (this.reviewForm.valid && !this.isGenerated) {
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

  navigateToUpdate(game: Game) {
    // Navigate to the update game page with the selected game ID
    this._router.navigate(['/update-game', game.id]);
  }

  addGameToLibrary(gameId: number) {
   this._gameService.getGame(gameId).subscribe((game) => {
      this.game = game;
    })
    if (!this.game.gameDiscount)
  this.metamaskService.SpendCoinsSingleGme(this.game.price, this.game)
else
{
  newPrice = this.game.price
  if (this.game.gameDiscount.discountPercentage){
  var newPrice = this.game.price - (this.game.price * this.game.gameDiscount.discountPercentage / 100)
  this.metamaskService.SpendCoinsSingleGme(newPrice, this.game)
}

}

   this._router.navigate(['/games',gameId]);
  }
  
  

}
