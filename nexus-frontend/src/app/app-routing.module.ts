import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesCarouselComponent } from './games/games-carousel/games-carousel.component';
import { GamesComponent } from './games/games/games.component';
import { HomeComponent } from './home/home/home.component';
import { GamePageComponent } from './games/game-page/game-page.component';
import { CreateGameComponent } from './games/create-game/create-game.component';
import { GameGridComponent } from './games/game-grid/game-grid.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { GameCategoriesComponent } from './game-categories/game-categories.component';
import { GamesListComponent } from './games/gameslist/games-list/games-list.component';
import { AdminGameListComponent } from './admin-game-list/admin-game-list.component';
import { CreateGameCategoryComponent } from './games/create-game-category/create-game-category.component';
import { GameCategoryListComponent } from './game-category-list/game-category-list.component';
import { GameKeyListComponent } from './games/game-key-list/game-key-list.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminHomeComponent, // has the sidebar
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {path: 'games/keys', component: GameKeyListComponent},

      { path: 'games/categories', component: GameCategoryListComponent },
      { path: 'games/list', component: AdminGameListComponent },
      {path: 'update-game/:id', component: CreateGameComponent},
      {path: 'update-game-category/:id', component: CreateGameCategoryComponent},
      {path: 'add-new-game', component: CreateGameComponent},
      {path: 'games/:id', component: GamePageComponent},
      {path: 'games/categories/add-new-category', component: CreateGameCategoryComponent}

    ]
  },
  {path: '', component: HomeComponent},
  {path: 'games/:id', component: GamePageComponent},
  {path: 'category/:name', component: GameGridComponent},
  {path: 'admin', component: AdminHomeComponent},
  {path: 'admin/categories', component: GameCategoriesComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
