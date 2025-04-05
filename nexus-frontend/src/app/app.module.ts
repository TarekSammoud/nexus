import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GamesCarouselComponent } from './games/games-carousel/games-carousel.component';
import { GamesComponent } from './games/games/games.component';

// Import support components
import { SupportTicketComponent } from './support/support-ticket/support-ticket.component';
import { SupportAgentComponent } from './support/support-agent/support-agent.component';
import { RoomComponent } from './support/room/room.component';
import { PerformanceReviewComponent } from './support/performance-review/performance-review.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GamesCarouselComponent,
    GamesComponent,
    SupportTicketComponent,
    SupportAgentComponent,
    RoomComponent,
    PerformanceReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
