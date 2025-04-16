import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// UI & Libs
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from '@syncfusion/ej2-angular-navigations';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { QRCodeModule } from 'angularx-qrcode';

// Angular Material
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

// Core Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { HomeComponent } from './home/home/home.component';


// Games & Game Categories
import { GamesComponent } from './games/games/games.component';
import { GamesCarouselComponent } from './games/games-carousel/games-carousel.component';
import { GamesListComponent } from './games/gameslist/games-list/games-list.component';
import { GamePageComponent } from './games/game-page/game-page.component';
import { GameGridComponent } from './games/game-grid/game-grid.component';
import { CreateGameComponent } from './games/create-game/create-game.component';
import { CreateGameCategoryComponent } from './games/create-game-category/create-game-category.component';
import { GameCategoryListComponent } from './game-category-list/game-category-list.component';
import { GameKeyListComponent } from './games/game-key-list/game-key-list.component';
import { GameReviewListComponent } from './game-review-list/game-review-list.component';

// Jam Components
import { JamsComponent } from './jams/jams/jams.component';
import { JamsListComponent } from './jams/jams-list/jams-list.component';
import { JamDetailsComponent } from './jams/jam-details/jam-details.component';
import { JamFormComponent } from './jams/jam-form/jam-form.component';
import { JamEditComponent } from './jams/jam-edit/jam-edit.component';
import { JamDetailsPageComponent } from './jams/entries/jam-details-page/jam-details-page.component';
import { EntryFormComponent } from './jams/entries/entry-form.component';
import { EntryMediaFormComponent } from './jams/EntryMedia/entry-media-form/entry-media-form.component';
import { EntryRatingFormComponent } from './jams/entry-rating-form/entry-rating-form.component';
import { VipJamsListComponent } from './jams/vip-jams-list/vip-jams-list.component';

// Admin Jam Pages
import { AdminJamsListComponent } from './admin-jam/pages/admin-jams-list/admin-jams-list.component';
import { AdminJamEditComponent } from './admin-jam/pages/admin-jam-edit/admin-jam-edit.component';
import { AdminJamDetailsComponent } from './admin-jam/pages/admin-jam-details/admin-jam-details.component';
import { AdminEntriesListComponent } from './admin-jam/pages/admin-entries-list/admin-entries-list.component';
import { AdminJamMediaListComponent } from './admin-jam/pages/admin-jam-media-list/admin-jam-media-list.component';
import { AdminJamRatingsListComponent } from './admin-jam/pages/admin-jam-ratings/admin-jam-ratings-list.component';
import { VipJamFormComponent } from './admin-jam/pages/vip-jam-form/vip-jam-form.component';

// User Management
import { LoginComponent } from './user-management/login/login.component';
import { SignupComponent } from './user-management/signup/signup.component';
import { ForgotPasswordComponent } from './user-management/forgot-password/forgot-password.component';
import { UserListComponent } from './user-management/user-list/user-list.component';
import { UserDetailsComponent } from './user-management/user-details/user-details.component';
import { UserFormComponent } from './user-management/user-form/user-form.component';
import { UserAvatarComponent } from './user-management/user-avatar/user-avatar.component';
import { FriendRequestListComponent } from './user-management/friend-request-list/friend-request-list.component';
import { FriendRequestActionsComponent } from './user-management/friend-request-actions/friend-request-actions.component';
import { BlockedUsersComponent } from './user-management/blocked-users/blocked-users.component';
import { NotificationsComponent } from './user-management/notifications/notifications.component';
import { GameLibraryComponent } from './user-management/game-library/game-library.component';
import { RoleManagementComponent } from './user-management/role-management/role-management.component';
import { ChangePasswordComponent } from './user-management/change-password/change-password.component';
import { UserDashboardComponent } from './user-management/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './user-management/admin-dashboard/admin-dashboard.component';
import { UserProfileComponent } from './user-management/user-profile/user-profile.component';
import { EditProfileComponent } from './user-management/edit-profile/edit-profile.component';
import { FriendManagementComponent } from './user-management/friend-management/friend-management.component';
import { ChatComponent } from './user-management/chat/chat.component';

// Support & Market
import { SupportTicketComponent } from './support/support-ticket/support-ticket.component';
import { RoomComponent } from './support/room/room.component';
import { PerformanceReviewComponent } from './support/performance-review/performance-review.component';
import { SupportAgentComponent } from './support/support-agent/support-agent.component';
import { RoomChatComponent } from './support/room-chat/room-chat.component';
import { AdminSupportListComponent } from './admin-support/admin-support-list/admin-support-list.component';
import { AdminAgentSupportComponent } from './admin-support/admin-agent-support/admin-agent-support.component';
import { AdminPerformanceReviewComponent } from './admin-support/admin-performance-review/admin-performance-review.component';
import { AdminRoomComponent } from './admin-support/admin-room/admin-room.component';
import { MarketListComponent } from './market/market-list/market-list.component';
import { MarketCreateComponent } from './market/market-create/market-create.component';
import { MarketEditComponent } from './market/market-edit/market-edit.component';
import { BidComponent } from './market/bid/bid.component';
import { MarketDetailsComponent } from './market/market-details/market-details.component';

// Services & Interceptors
import { TokenService } from './core/services/user-management/token.service';
import { JwtInterceptor } from './core/services/user-management/jwt.interceptor';
import { AuthInterceptor } from './core/services/user-management/auth.interceptor';


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
  
  

    JamsComponent,
    JamsListComponent,
    JamDetailsComponent,
    JamFormComponent,
    JamEditComponent,
    JamDetailsPageComponent,
    EntryFormComponent,
    EntryMediaFormComponent,
    EntryRatingFormComponent,
    VipJamsListComponent,

    AdminJamsListComponent,
    AdminJamEditComponent,
    AdminJamDetailsComponent,
    AdminEntriesListComponent,
    AdminJamMediaListComponent,
    AdminJamRatingsListComponent,
    VipJamFormComponent,

    AdminHomeComponent,
    HomeComponent,

    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    UserListComponent,
    UserDetailsComponent,
    UserFormComponent,
    UserAvatarComponent,
    FriendRequestListComponent,
    FriendRequestActionsComponent,
    BlockedUsersComponent,
    NotificationsComponent,
    GameLibraryComponent,
    RoleManagementComponent,
    ChangePasswordComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    UserProfileComponent,
    EditProfileComponent,
    FriendManagementComponent,
    ChatComponent,

    SupportTicketComponent,
    RoomComponent,
    PerformanceReviewComponent,
    SupportAgentComponent,
    RoomChatComponent,
    AdminSupportListComponent,
    AdminAgentSupportComponent,
    AdminPerformanceReviewComponent,
    AdminRoomComponent,

    MarketListComponent,
    MarketCreateComponent,
    MarketEditComponent,
    BidComponent,
    MarketDetailsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    CarouselModule,
    AngularEditorModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    QRCodeModule,

    GameReviewListComponent,
    GameKeyListComponent,
    GameCategoryListComponent,
    GamesListComponent,

    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatDialogModule
  ],
  providers: [
    TokenService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
