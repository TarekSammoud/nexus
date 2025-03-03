import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent, GridModule } from '@syncfusion/ej2-angular-grids';
import { ChipListModule } from '@syncfusion/ej2-angular-buttons';
import { Game } from 'src/app/core/entities/game/game';
import { GameService } from 'src/app/core/services/game/game.service';

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
      constructor(private gameService: GameService) {
        this.gameService.getGames().subscribe(games => {
          this.data = games; 
        });
  
      }


  @ViewChild('grid')
  public grid?: GridComponent;

  ngOnInit(): void {
      this.data = [];
  }
}