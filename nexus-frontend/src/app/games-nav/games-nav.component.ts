import { Component } from '@angular/core';
import { NgbNavModule, NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { GameCategory } from '../core/entities/game/game-category';
import { GameCategoryService } from '../core/services/gameCategory/game-category.service';
import { Game } from '../core/entities/game/game';
import { GameService } from '../core/services/game/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games-nav',
  templateUrl: './games-nav.component.html',
  styleUrls: ['./games-nav.component.css'],
  providers: [NgbNavConfig]  // Add NgbNavConfig to the providers array
})
export class GamesNavComponent {

  availableCategories!: GameCategory[];
  games: Game[] = [];
  filteredGames: Game[] = [];

  // List of dynamic tabs
  navs: number[] = [0, 1];
  // Initialize counter for the next tab to be added
  counter = this.navs.length + 1;

  // Track the active tab
  active: number = this.navs[0]; // Set the default active tab to the first tab.
  filterCategory?: GameCategory;

  constructor(private _gameService: GameService,config: NgbNavConfig,private _gameCategoryService:GameCategoryService,private _router:Router) {


    this._gameService.getGames().subscribe(games => {
      this.games = games;
      this.filteredGames = this.games; 

    })


    this._gameCategoryService.getGameCategories().subscribe((data) => {
      this.availableCategories = data.map((category) => {
        return {
          id: category.id,
          name: category.name,
          description: category.description
        };
      });

      this.chunkedCategories = this.chunkArray(this.availableCategories, 4)

    }
    
  
  );

    config.destroyOnHide = false;  // Ensure content persists when tab is inactive
  }

  searchText: string = '';
  platform: string = '';


  goToCategory(category: GameCategory) {
    // Navigate to the game grid page with the selected category
    window.location.href = `/category/${category.name}`;
  }



  filterResults(text: string) {

    this.filteredGames = this.games.filter(game => {
      const matchesText = !text || game.name.toLowerCase().includes(text.toLowerCase());
      const matchesPlatform = !this.platform || 
      game.platforms?.includes(this.platform);
      const matchesCategory = !this.filterCategory ||
        game.categories?.some(cat => {
          const match = cat.id === this.filterCategory?.id;
          return match;
        });
  
      return matchesText && matchesCategory && matchesPlatform;
    });
  
  }


  filteredGamesTop: Game[] = [];
  
  searchTextBar: string = '';
  page = 1;


  filterResultsTop(search: string): void {
    if (!search) {
      this.filteredGamesTop = [];
      return;
    }
    

    const lowerSearch = search.toLowerCase();
    this.filteredGamesTop = this.games.filter(game => 
      game.name.toLowerCase().includes(lowerSearch)
    );
    //console.log(this.filteredGamesTop)
  }
  

  // Track the tab by its unique id
  track(index: number, id: number): number {
    return id; // You can add a more complex tracking logic if needed.
  }

  // Method to remove a tab when the close button is clicked
  close(event: MouseEvent, toRemove: number) {
    event.preventDefault();
    event.stopImmediatePropagation();

    // Ensure we don't remove the active tab if there are other tabs left
    if (this.navs.length > 1) {
      this.navs = this.navs.filter((id) => id !== toRemove);

      // If the active tab is removed, reset it to the first tab
      if (this.active === toRemove) {
        this.active = this.navs[0];
      }
    }
  }

  // Method to add a new tab
  add(event: MouseEvent) {
    event.preventDefault();

    // Add a new tab and increment the counter
    this.navs.push(this.counter++);
  }

  // Optional: Set a default active tab if needed
  defaultActiveTab(tabId: number) {
    this.active = tabId;
  }

      goToPage(category: GameCategory) {
        // Navigate to the game grid page with the selected category
        window.location.href = `/category/${category.name}`;
      }


      chunkedCategories: any[][] = [];
      chunkArray(array: any[], size: number): any[][] {
        const chunked = [];
        for (let i = 0; i < array.length; i += size) {
          chunked.push(array.slice(i, i + size));
        }
        return chunked;
      }

      OnSelect(game: Game) {
        this._router.navigate(['/games', game.id]);
        }
}
