import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GamesCarouselComponent } from './games/games-carousel/games-carousel.component';
import { GamesComponent } from './games/games/games.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home/home.component';
import { CarouselModule } from '@syncfusion/ej2-angular-navigations';
import { GamesListComponent } from './games/gameslist/games-list/games-list.component';
import { GamePageComponent } from './games/game-page/game-page.component';
import { CreateGameComponent } from './games/create-game/create-game.component';
import { CreateGameCategoryComponent } from './games/create-game-category/create-game-category.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipInput, MatChipsModule } from '@angular/material/chips';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GamesComponent,
    HomeComponent,
    GamesCarouselComponent,
    GamePageComponent,
    CreateGameComponent,
    CreateGameCategoryComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule,
    GamesListComponent,
    BrowserAnimationsModule,
    MatChipsModule,
    MatIconModule,
    MatProgressBarModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
