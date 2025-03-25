import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesCarouselComponent } from './games/games-carousel/games-carousel.component';
import { GamesComponent } from './games/games/games.component';
import { PublicationListComponent } from './community/publication-list/publication-list.component';
import { PublicationFormComponent } from './community/publication-form/publication-form.component';
const routes: Routes = [
  {path: 'games', component: GamesComponent},
    { path: 'community', component: PublicationListComponent },
    { path: 'community/add', component: PublicationFormComponent },
    { path: 'community/edit/:id', component: PublicationFormComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
