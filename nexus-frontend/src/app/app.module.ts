import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { JamDetailsPageComponent } from './jams/entries/jam-details-page/jam-details-page.component';
import { EntryFormComponent } from './jams/entries/entry-form.component';
import { EntryMediaFormComponent } from './jams/EntryMedia/entry-media-form/entry-media-form.component';
import { EntryRatingFormComponent } from './jams/entry-rating-form/entry-rating-form.component';
import { QRCodeModule } from 'angularx-qrcode';


import { GamePageComponent } from './games/game-page/game-page.component';
import { CreateGameComponent } from './games/create-game/create-game.component';
import { CreateGameCategoryComponent } from './games/create-game-category/create-game-category.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipInput, MatChipsModule } from '@angular/material/chips';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GameGridComponent } from './games/game-grid/game-grid.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { GameCategoriesComponent } from './game-categories/game-categories.component';
import { AdminGameListComponent } from './admin-game-list/admin-game-list.component';
import { AngularEditorComponent, AngularEditorModule } from '@kolkov/angular-editor';
import { QuillModule } from 'ngx-quill';
import { GameCategoryListComponent } from './game-category-list/game-category-list.component';


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
    JamDetailsPageComponent,
    EntryFormComponent,
    EntryMediaFormComponent,
    EntryRatingFormComponent 
    GamePageComponent,
    CreateGameComponent,
    CreateGameCategoryComponent,
    GameGridComponent,
    AdminHomeComponent,
    GameCategoriesComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CarouselModule,
    GamesListComponent,
    NgxPaginationModule,
    QRCodeModule,

    BrowserAnimationsModule,
    MatChipsModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule,
    AdminGameListComponent,
    AngularEditorModule,
    QuillModule.forRoot(),
    GameCategoryListComponent
      
    


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
