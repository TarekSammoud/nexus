import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesCarouselComponent } from './games/games-carousel/games-carousel.component';
import { GamesComponent } from './games/games/games.component';
import { SupportTicketComponent } from './support/support-ticket/support-ticket.component';
import { SupportAgentComponent } from './support/support-agent/support-agent.component'; // Import the component

const routes: Routes = [
  {path: 'games', component: GamesComponent},
  {path: 'support-tickets', component: SupportTicketComponent},
  {path: 'support-agent', component: SupportAgentComponent}  // Add this route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
