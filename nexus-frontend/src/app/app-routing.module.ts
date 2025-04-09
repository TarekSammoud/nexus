import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesCarouselComponent } from './games/games-carousel/games-carousel.component';
import { GamesComponent } from './games/games/games.component';
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
import { AdminJamsListComponent } from './admin-jam/pages/admin-jams-list/admin-jams-list.component';
import { AdminJamEditComponent } from './admin-jam/pages/admin-jam-edit/admin-jam-edit.component';
import { AdminJamDetailsComponent } from './admin-jam/pages/admin-jam-details/admin-jam-details.component';
import { AdminEntriesListComponent } from './admin-jam/pages/admin-entries-list/admin-entries-list.component';
import { AdminJamMediaListComponent } from './admin-jam/pages/admin-jam-media-list/admin-jam-media-list.component';
import { AdminJamRatingsListComponent } from './admin-jam/pages/admin-jam-ratings/admin-jam-ratings-list.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminHomeComponent, // has the sidebar
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'games/categories', component: GameCategoryListComponent },
      { path: 'games/list', component: AdminGameListComponent },
      {path: 'update-game/:id', component: CreateGameComponent},
      {path: 'update-game-category/:id', component: CreateGameCategoryComponent},
      {path: 'add-new-game', component: CreateGameComponent},
      {path: 'games/:id', component: GamePageComponent},
      {path: 'games/categories/add-new-category', component: CreateGameCategoryComponent},
    { path: 'jams/list', component: AdminJamsListComponent },
    { path: 'jams/edit/:id', component: AdminJamEditComponent },
    { path: 'jams/details/:id', component: AdminJamDetailsComponent },
    { path: 'jams/entries', component: AdminEntriesListComponent },
    { path: 'jams/media' , component: AdminJamMediaListComponent },
   { path: 'jams/ratings' , component: AdminJamRatingsListComponent },

    ]
  },
  {path: '', component: HomeComponent},
  {path: 'jams', component: JamsComponent},
  { path: 'jam/:id', component: JamDetailsPageComponent },

  {path: '', component: HomeComponent},
  {path: 'games/:id', component: GamePageComponent},
  {path: 'category/:name', component: GameGridComponent},
  {path: 'admin', component: AdminHomeComponent},
  {path: 'admin/categories', component: GameCategoriesComponent},
  {path: 'admin/games/list', component: CreateGameComponent, outlet: 'adminOutlet'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
