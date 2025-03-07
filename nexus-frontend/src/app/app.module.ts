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
import { JamsListComponent } from './jams/jams-list/jams-list.component';
import { JamsComponent } from './jams/jams/jams.component';
import { JamDetailsComponent } from './jams/jam-details/jam-details.component';
import { JamFormComponent } from './jams/jam-form/jam-form.component';
import { FormsModule } from '@angular/forms';
import { JamEditComponent } from './jams/jam-edit/jam-edit.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GamesComponent,
    HomeComponent,
    GamesCarouselComponent,
    JamsListComponent,
    JamsComponent,
    JamDetailsComponent,
    JamFormComponent,
    JamEditComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule,
    GamesListComponent



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
