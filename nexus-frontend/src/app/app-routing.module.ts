import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesCarouselComponent } from './games/games-carousel/games-carousel.component';
import { GamesComponent } from './games/games/games.component';
import { HomeComponent } from './home/home/home.component';
import { JamsListComponent } from './jams/jams-list/jams-list.component';
import { JamsComponent } from './jams/jams/jams.component';
import { JamDetailsComponent } from './jams/jam-details/jam-details.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'jams', component: JamsComponent},
  { path: 'jams/:id', component: JamDetailsComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
