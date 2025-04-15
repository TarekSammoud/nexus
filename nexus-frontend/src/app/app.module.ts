import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common'; 

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
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GameGridComponent } from './games/game-grid/game-grid.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { GameCategoriesComponent } from './game-categories/game-categories.component';
import { AdminGameListComponent } from './admin-game-list/admin-game-list.component';
import { AngularEditorComponent, AngularEditorModule } from '@kolkov/angular-editor';
import { GameCategoryListComponent } from './game-category-list/game-category-list.component';
import { GameKeyListComponent } from './games/game-key-list/game-key-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GameReviewListComponent } from './game-review-list/game-review-list.component';
import { AdminJamsListComponent } from './admin-jam/pages/admin-jams-list/admin-jams-list.component';
import { AdminJamEditComponent } from './admin-jam/pages/admin-jam-edit/admin-jam-edit.component';
import { AdminJamDetailsComponent } from './admin-jam/pages/admin-jam-details/admin-jam-details.component';
import { AdminEntriesListComponent } from './admin-jam/pages/admin-entries-list/admin-entries-list.component';
import { AdminJamMediaListComponent } from './admin-jam/pages/admin-jam-media-list/admin-jam-media-list.component';
import { AdminJamRatingsListComponent } from './admin-jam/pages/admin-jam-ratings/admin-jam-ratings-list.component';
import { VipJamFormComponent } from './admin-jam/pages/vip-jam-form/vip-jam-form.component';
import { VipJamsListComponent } from './jams/vip-jams-list/vip-jams-list.component';
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
    EntryRatingFormComponent,
    GamePageComponent,
    CreateGameComponent,
    CreateGameCategoryComponent,
    GameGridComponent,
    AdminHomeComponent,
    GameCategoriesComponent,
    AdminJamsListComponent,
    AdminJamEditComponent,
    AdminJamDetailsComponent,
    AdminEntriesListComponent,
    AdminJamMediaListComponent,
    AdminJamRatingsListComponent,
    VipJamFormComponent,
    VipJamsListComponent,

    
    
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
    CommonModule,

    BrowserAnimationsModule,
    MatChipsModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule,
    AdminGameListComponent,
    AngularEditorModule,
    GameCategoryListComponent
      
    


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
