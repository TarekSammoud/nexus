import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesCarouselComponent } from './games/games-carousel/games-carousel.component';
import { GamesComponent } from './games/games/games.component';
import { SupportTicketComponent } from './support/support-ticket/support-ticket.component';

const routes: Routes = [
  {path: 'games', component: GamesComponent},
  {path: 'support-tickets', component: SupportTicketComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
