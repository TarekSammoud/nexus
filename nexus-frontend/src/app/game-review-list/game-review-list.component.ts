import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../core/services/game/game.service';
import { GameReview } from '../core/entities/game/game-review';
import { CommonModule } from '@angular/common';
import { GridComponent, GridModule } from '@syncfusion/ej2-angular-grids';
import { ChipListModule } from '@syncfusion/ej2-angular-buttons';
import { Game } from '../core/entities/game/game';

@Component({
  selector: 'app-game-review-list',
  templateUrl: './game-review-list.component.html',
  styleUrls: ['./game-review-list.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
      CommonModule,  // Required for built-in directives like *ngIf, *ngFor
      GridModule,
      ChipListModule,
  
    ],
  
})
export class GameReviewListComponent implements OnInit {
        data? : GameReview[];
  
      constructor(private _router : Router,private gameService: GameService) {
        this.gameService.getReviews().subscribe(reviews => {
          this.data = reviews; 
          console.log(this.data);

          for (let i = 0; i < this.data.length; i++) {
            for (let j = 0; j < this.data[i].game.gameMediaList.length; j++) {
              if (this.data[i].game.gameMediaList[j].gameMediaType == 'COVER') {
                this.data[i].game.coverPicture = this.data[i].game.gameMediaList[j]; 
                console.log(this.data[i].game.coverPicture?.mediaUrl);
                break; 
              }
            }
          }

        });
      }

  ngOnInit(): void {
    this.data = [];

  }

  deleteGameReview(data: GameReview){
    this.gameService.deleteGameReview(data.id).subscribe(() => {
      this.data = this.data?.filter((item) => item.id !== data.id);
    });
  }



  
    @ViewChild('grid')
    public grid?: GridComponent;

    OnSelect(game : Game){
      this._router.navigate(['/games', game.id]);
    }

}
