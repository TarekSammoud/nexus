import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesCarouselComponent } from './games/games-carousel/games-carousel.component';
import { GamesComponent } from './games/games/games.component';

import { PublicationListComponent } from './community/publication-list/publication-list.component';
import { PublicationFormComponent } from './community/publication-form/publication-form.component';

import { HomeComponent } from './home/home/home.component';
import { JamsListComponent } from './jams/jams-list/jams-list.component';
import { JamsComponent } from './jams/jams/jams.component';
import { JamDetailsPageComponent } from './jams/entries/jam-details-page/jam-details-page.component';
import { GamePageComponent } from './games/game-page/game-page.component';
import { CreateGameComponent } from './games/create-game/create-game.component';
import { GameGridComponent } from './games/game-grid/game-grid.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { GameCategoriesComponent } from './game-categories/game-categories.component';
import { GamesListComponent } from './games/gameslist/games-list/games-list.component';
import { AdminGameListComponent } from './admin-game-list/admin-game-list.component';
import { CreateGameCategoryComponent } from './games/create-game-category/create-game-category.component';
import { GameCategoryListComponent } from './game-category-list/game-category-list.component';

const routes: Routes = [
  // Routes de ta branche (CommunityManagement)
  { path: 'games', component: GamesComponent },
  { path: 'community', component: PublicationListComponent },
  { path: 'community/add', component: PublicationFormComponent },
  { path: 'community/edit/:id', component: PublicationFormComponent },

  // Routes de la branche prod intégrées clairement
  {
    path: 'admin',
    component: AdminHomeComponent, // a le sidebar
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'games/categories', component: GameCategoryListComponent },
      { path: 'games/list', component: AdminGameListComponent },
      { path: 'update-game/:id', component: CreateGameComponent },
      { path: 'update-game-category/:id', component: CreateGameCategoryComponent },
      { path: 'add-new-game', component: CreateGameComponent },
      { path: 'games/:id', component: GamePageComponent },
      { path: 'games/categories/add-new-category', component: CreateGameCategoryComponent }
    ]
  },

  { path: '', component: HomeComponent },
  { path: 'jams', component: JamsComponent },
  { path: 'jam/:id', component: JamDetailsPageComponent },
  { path: 'games/:id', component: GamePageComponent },
  { path: 'category/:name', component: GameGridComponent },
  { path: 'admin/categories', component: GameCategoriesComponent },
  { path: 'admin/games/list', component: CreateGameComponent, outlet: 'adminOutlet' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
