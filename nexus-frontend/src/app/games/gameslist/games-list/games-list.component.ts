import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent, GridModule } from '@syncfusion/ej2-angular-grids';
import { ChipListModule } from '@syncfusion/ej2-angular-buttons';
import { Game } from 'src/app/core/entities/game/game';
import { GameService } from 'src/app/core/services/game/game.service';
import { Router } from '@angular/router';
import { GameMedia } from 'src/app/core/entities/game/game-media';

@Component({
  selector: 'app-games-list',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,  // Required for built-in directives like *ngIf, *ngFor
    GridModule,
    ChipListModule,

  ],

  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css'],
})
export class GamesListComponent  implements OnInit {

      data? : Game[];
      constructor(private _router : Router,private gameService: GameService) {
        this.gameService.getGames().subscribe(games => {
          this.data = games; 
          for (let i = 0; i < this.data.length; i++) {
            for (let j = 0; j < this.data[i].gameMediaList.length; j++) {
              if (this.data[i].gameMediaList[j].gameMediaType == 'COVER') {
                this.data[i].coverPicture = this.data[i].gameMediaList[j]; 
                //console.log(this.data[i].coverPicture?.mediaUrl);
                break; 
              }
            }
          }

        });
  
      }

 


  @ViewChild('grid')
  public grid?: GridComponent;

  ngOnInit(): void {
      this.data = [];
  }

  OnSelect(game : Game){
    this._router.navigate(['/games', game.id]);
  }
}