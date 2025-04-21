import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent, GridModule } from '@syncfusion/ej2-angular-grids';
import { ChipListModule } from '@syncfusion/ej2-angular-buttons';
import { Game } from 'src/app/core/entities/game/game';
import { GameService } from 'src/app/core/services/game/game.service';
import { Router } from '@angular/router';
import { GameKeyService } from '../core/services/game-key.service';
import { GameKey } from '../core/entities/game-key';
import { User } from '@syncfusion/ej2/interactive-chat';

@Component({
  selector: 'app-admin-game-list',
  encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
      CommonModule,  // Required for built-in directives like *ngIf, *ngFor
      GridModule,
      ChipListModule,
  
    ],
  
  templateUrl: './admin-game-list.component.html',
  styleUrls: ['./admin-game-list.component.css']
})
export class AdminGameListComponent implements OnInit {

      data? : Game[];
      constructor(private _gameKeyService: GameKeyService,private _router : Router,private gameService: GameService) {
        this.gameService.getGames().subscribe(games => {
          this.data = games; 
          for (let i = 0; i < this.data.length; i++) {
            for (let j = 0; j < this.data[i].gameMediaList.length; j++) {
              if (this.data[i].gameMediaList[j].gameMediaType == 'COVER') {
                this.data[i].coverPicture = this.data[i].gameMediaList[j]; 
                console.log(this.data[i].coverPicture?.mediaUrl);
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
    this._router.navigate(['/admin/games', game.id]);
  }

  navigateToCreate(){
    this._router.navigate(['admin/add-new-game']);
  }

  navigateToCreateBrowser(){
    this._router.navigate(['admin/add-new-browser-game']);
  }

  navigateToCreateEmulated(){
    this._router.navigate(['admin/add-new-emulated-game']);
  }

  editGame(data: Game){
    this._router.navigate(['admin/update-game', data.id]);
  }
  deleteGame(data: Game){
    if (!confirm('Are you sure you want to delete this game?')) {
      return;
    }
    if (data.id === undefined) {
      console.error('Game ID is undefined');
    }
    else{
    this.gameService.deleteGame(data).subscribe(() => {
      this.data = this.data?.filter(game => game.id !== data.id);
    });
  }
  }

  generateKey(data: Game){
    console.log(data);
    const token = localStorage.getItem('token');
    
     var gameKey: any = { game: data, user: { id: 1 } };  // Initialize gameKey with required properties

     console.log(gameKey);
    this._gameKeyService.addGameKey(gameKey).subscribe((response) => {
      alert("Game key generated successfully");
      this._router.navigate(['admin/games', data.id]);
    }
    , (error) => {
      alert("Failed to generate game key");
    }
    );
  }
}
