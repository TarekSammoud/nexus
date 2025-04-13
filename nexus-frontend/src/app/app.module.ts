import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { GamesComponent } from './games/games/games.component';
import { GamesCarouselComponent } from './games/games-carousel/games-carousel.component';
import { GamePageComponent } from './games/game-page/game-page.component';
import { CreateGameComponent } from './games/create-game/create-game.component';
import { CreateGameCategoryComponent } from './games/create-game-category/create-game-category.component';
import { GameGridComponent } from './games/game-grid/game-grid.component';

import { PublicationListComponent } from './community/publication-list/publication-list.component';
import { PublicationFormComponent } from './community/publication-form/publication-form.component';

import { HomeComponent } from './home/home/home.component';

import { JamsListComponent } from './jams/jams-list/jams-list.component';
import { JamsComponent } from './jams/jams/jams.component';
import { JamDetailsComponent } from './jams/jam-details/jam-details.component';
import { JamFormComponent } from './jams/jam-form/jam-form.component';
import { JamEditComponent } from './jams/jam-edit/jam-edit.component';
import { JamDetailsPageComponent } from './jams/entries/jam-details-page/jam-details-page.component';
import { EntryFormComponent } from './jams/entries/entry-form.component';
import { EntryMediaFormComponent } from './jams/EntryMedia/entry-media-form/entry-media-form.component';
import { EntryRatingFormComponent } from './jams/entry-rating-form/entry-rating-form.component';

import { AdminHomeComponent } from './admin-home/admin-home.component';
import { GameCategoriesComponent } from './game-categories/game-categories.component';

// Material Modules
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

// Editor / Quill / QR / Carousel
import { AngularEditorModule } from '@kolkov/angular-editor';
import { QuillModule } from 'ngx-quill';
import { QRCodeModule } from 'angularx-qrcode';
import { CarouselModule } from '@syncfusion/ej2-angular-navigations';

// ✅ Standalone Components (à importer directement ici)
import { GamesListComponent } from './games/gameslist/games-list/games-list.component';
import { AdminGameListComponent } from './admin-game-list/admin-game-list.component';
import { GameCategoryListComponent } from './game-category-list/game-category-list.component';
import { CategoryListComponent } from './community/category-list/category-list.component';
import { CategoryFormComponent } from './community/category-form/category-form.component';
import { ReportListComponent } from './community/report-list/report-list.component';
import { ReportFormComponent } from './community/report-form/report-form.component';
import { SondageCreateComponent } from './community/sondage/sondage-create/sondage-create.component';
import { SondageListComponent } from './community/sondage/sondage-list/sondage-list.component';
import { SondageLiveComponent } from './community/sondage/sondage-live/sondage-live.component';
import { SondageAdminComponent } from './community/sondage/sondage-admin/sondage-admin.component';
import { StreamerManagementComponent } from './community/sondage/streamer-management/streamer-management.component';
import { LiveRoomComponent } from './community/sondage/live-room/live-room.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GamesComponent,
    GamesCarouselComponent,
    GamePageComponent,
    CreateGameComponent,
    CreateGameCategoryComponent,
    GameGridComponent,
    PublicationListComponent,
    PublicationFormComponent,
    HomeComponent,
    JamsListComponent,
    JamsComponent,
    JamDetailsComponent,
    JamFormComponent,
    JamEditComponent,
    JamDetailsPageComponent,
    EntryFormComponent,
    EntryMediaFormComponent,
    EntryRatingFormComponent,
    AdminHomeComponent,
    GameCategoriesComponent,
    CategoryListComponent,
    CategoryFormComponent,
    ReportListComponent,
    ReportFormComponent,
    SondageCreateComponent,
    SondageListComponent,
    SondageLiveComponent,
    SondageAdminComponent,
    StreamerManagementComponent,
    LiveRoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    NgxPaginationModule,
    QRCodeModule,
    CarouselModule,
    MatChipsModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule,
    QuillModule.forRoot(),

    // ✅ Standalone components (importés ici, pas dans `declarations`)
    GamesListComponent,
    AdminGameListComponent,
    GameCategoryListComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
