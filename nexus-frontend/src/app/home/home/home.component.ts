import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/core/entities/game/game';
import { GameCategory } from 'src/app/core/entities/game/game-category';
import { GameService } from 'src/app/core/services/game/game.service';
import { GameCategoryService } from 'src/app/core/services/gameCategory/game-category.service';
import { GameMediaService } from 'src/app/core/services/gameMedia/game-media.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  games: Game[] = [];
  availableCategories!: GameCategory[];
  name: String = '';

  @ViewChild('chipContainer', { static: false }) chipContainer!: ElementRef;

  constructor(
    private _gameMediaService: GameMediaService,
    private _gameService: GameService,
    private _gameCategoryService: GameCategoryService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.loadGames();
    this.loadCategories();
  }

  ngAfterViewInit(): void {
    const hasReloaded = localStorage.getItem('homeReloaded');

    if (!hasReloaded) {
      localStorage.setItem('homeReloaded', 'true');
      window.location.reload();
    } else {
      localStorage.removeItem('homeReloaded');
    }
  }

  private loadGames(): void {
    this._gameService.getGames().subscribe(games => {
      this.games = games;
      for (let i = 0; i < this.games.length; i++) {
        for (let j = 0; j < this.games[i].gameMediaList.length; j++) {
          if (this.games[i].gameMediaList[j].gameMediaType === 'COVER') {
            this.games[i].coverPicture = this.games[i].gameMediaList[j];
            break;
          }
        }
      }
    });
  }

  private loadCategories(): void {
    this._gameCategoryService.getGameCategories().subscribe((data) => {
      this.availableCategories = data.map((category) => ({
        id: category.id,
        name: category.name,
        description: category.description
      }));
    });
  }

  goToPage(category: GameCategory): void {
    window.location.href = `/category/${category.name}`;
  }

  scrollLeft(): void {
    this.chipContainer.nativeElement.scrollBy({ left: -100, behavior: 'smooth' });
  }

  scrollRight(): void {
    this.chipContainer.nativeElement.scrollBy({ left: 100, behavior: 'smooth' });
  }

  OnSelect(game: Game): void {
    this._router.navigate(['/games', game.id]);
  }
}
