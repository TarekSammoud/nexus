import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesCarouselComponent } from './games/games-carousel/games-carousel.component';
import { GamesComponent } from './games/games/games.component';
import { HomeComponent } from './home/home/home.component';
import { GamePageComponent } from './games/game-page/game-page.component';
import { CreateGameComponent } from './games/create-game/create-game.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'games/:id', component: GamePageComponent},
  {path: 'add-new-game', component: CreateGameComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
