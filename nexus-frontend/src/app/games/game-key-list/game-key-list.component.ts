import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent, GridModule } from '@syncfusion/ej2-angular-grids';
import { ChipListModule } from '@syncfusion/ej2-angular-buttons';
import { Game } from 'src/app/core/entities/game/game';
import { GameService } from 'src/app/core/services/game/game.service';
import { Router } from '@angular/router';
import { GameKey } from 'src/app/core/entities/game-key';
import { GameKeyService } from 'src/app/core/services/game-key.service';

@Component({
  selector: 'app-game-key-list',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,  // Required for built-in directives like *ngIf, *ngFor
    GridModule,
    ChipListModule,

  ],
  templateUrl: './game-key-list.component.html',
  styleUrls: ['./game-key-list.component.css']
})
export class GameKeyListComponent implements OnInit {
  data? : GameKey[];


  constructor(private _router : Router,private _gameKeyService: GameKeyService) {
    this._gameKeyService.getGameKeys().subscribe(games => {
      this.data = games; 
      console.log(this.data);

    });

  }

  getImageUrl(data: GameKey): string {
    if (data && data.game && data.game.gameMediaList && data.game.gameMediaList.length > 0) {
      return 'http://localhost:9000/nexus-backend/games/upload/download/' + data.game.gameMediaList[0].mediaUrl;
    }
    return './assets/default-game.jpg';
  }


  
  @ViewChild('grid')
  public grid?: GridComponent;

  ngOnInit(): void {
    this.data = [];
}


OnSelect(game : GameKey){
  this._router.navigate(['/admin/games', game.id]);
}

navigateToCreate(){
  this._router.navigate(['admin/add-new-game']);
}

editGame(data: GameKey){
  this._router.navigate(['admin/update-game', data.id]);
}
deleteGame(data: GameKey){
  if (!confirm('Are you sure you want to delete this game key?')) {
    return;
  }
  if (data.id === undefined) {
    console.error('Game key ID is undefined');
  }
  else{
  this._gameKeyService.deleteGameKey(data).subscribe(() => {
    this.data = this.data?.filter(gamekey => gamekey.id !== data.id);
  });
}
}

generateKey(data: Game){
  
}

copyToClipboard(text: string): void {
  if (navigator.clipboard) {
    // Using Clipboard API to write text to clipboard
    navigator.clipboard.writeText(text).then(() => {
      console.log('Text successfully copied to clipboard');
      // You can show a message to the user indicating the text was copied
    }).catch(err => {
      console.error('Error copying text to clipboard: ', err);
    });
  } else {
    // Fallback for browsers without Clipboard API support
    this.fallbackCopyToClipboard(text);
  }
}

private fallbackCopyToClipboard(text: string): void {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
  console.log('Text copied using fallback method');
}

}
