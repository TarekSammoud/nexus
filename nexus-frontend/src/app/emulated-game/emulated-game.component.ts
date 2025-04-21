import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../core/services/game/game.service';

@Component({
  selector: 'app-emulated-game',
  templateUrl: './emulated-game.component.html',
  styleUrls: ['./emulated-game.component.css']
})
export class EmulatedGameComponent implements OnInit {
  gameName: string = 'some-game-folder-name'; // Update dynamically as needed
  safeGameUrl!: SafeResourceUrl;
  vncUrl: string = '';

  constructor(
    private _gameService: GameService,
    private sanitizer: DomSanitizer,
    private _route: ActivatedRoute
  ) {
    // Get the game name from the route parameters
    this.gameName = this._route.snapshot.paramMap.get('name') || '';
    this._gameService.playGame(this.gameName).subscribe((vnc: string) => {
      this.vncUrl = vnc;
      console.log(this.vncUrl);
    });
  }

  ngOnInit(): void {
    this.safeGameUrl = this.sanitizer.bypassSecurityTrustResourceUrl("http://192.168.83.130:6080/vnc.html");
  }
}
