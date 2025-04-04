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

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'games/:id', component: GamePageComponent},
  {path: 'category/:name', component: GameGridComponent},
  {path: 'add-new-game', component: CreateGameComponent},
  {path: 'update-game/:id', component: CreateGameComponent},
  {path: 'admin', component: AdminHomeComponent},
  {path: 'admin/categories', component: GameCategoriesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
