import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from '@syncfusion/ej2-angular-navigations';
import { QRCodeModule } from 'angularx-qrcode';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

// --- Composants jeux, jams, support ---
import { HomeComponent } from './home/home/home.component';
import { GamesListComponent } from './games/gameslist/games-list/games-list.component';
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
import { GameCategoryListComponent } from './game-category-list/game-category-list.component';
import { GamesCarouselComponent } from './games/games-carousel/games-carousel.component';
import { GamesComponent } from './games/games/games.component';
import { MarketListComponent } from './market/market-list/market-list.component';
import { MarketCreateComponent } from './market/market-create/market-create.component';
import { MarketEditComponent } from './market/market-edit/market-edit.component';
import { BidComponent } from './market/bid/bid.component';
import { MarketDetailsComponent } from './market/market-details/market-details.component';

// --- Composants support ---
import { SupportTicketComponent } from './support/support-ticket/support-ticket.component';
import { RoomComponent } from './support/room/room.component';
import { PerformanceReviewComponent } from './support/performance-review/performance-review.component';
import { SupportAgentComponent } from './support/support-agent/support-agent.component';
import { RoomChatComponent } from './support/room-chat/room-chat.component';
import { AdminSupportListComponent } from './admin-support/admin-support-list/admin-support-list.component';
import { AdminAgentSupportComponent } from './admin-support/admin-agent-support/admin-agent-support.component';
import { AdminPerformanceReviewComponent } from './admin-support/admin-performance-review/admin-performance-review.component';
import { AdminRoomComponent } from './admin-support/admin-room/admin-room.component';

// --- Composants user management ---
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
import { LoginComponent } from './user-management/login/login.component';
import { SignupComponent } from './user-management/signup/signup.component';
import { ForgotPasswordComponent } from './user-management/forgot-password/forgot-password.component';
import { ChatComponent } from './user-management/chat/chat.component';



// --- Services & Intercepteurs ---
import { TokenService } from '../app/core/services/user-management/token.service';
import { JwtInterceptor } from '../app/core/services/user-management/jwt.interceptor';
import { AuthInterceptor } from '../app/core/services/user-management/auth.interceptor';import { GameKeyListComponent } from './games/game-key-list/game-key-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { GameReviewListComponent } from './game-review-list/game-review-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,

    GamePageComponent,
    CreateGameComponent,
    CreateGameCategoryComponent,
    GameGridComponent,
    AdminHomeComponent,
    GameCategoriesComponent,

    GamesCarouselComponent,
    GamesComponent,
    SupportTicketComponent,
    RoomComponent,
    PerformanceReviewComponent,
    SupportAgentComponent,
    RoomChatComponent,
    AdminSupportListComponent,
    AdminAgentSupportComponent,
    AdminPerformanceReviewComponent,
    AdminRoomComponent,
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
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ChatComponent,
    MarketListComponent,
    MarketCreateComponent,
    MarketEditComponent,
    BidComponent,
    MarketDetailsComponent,


    
  ],
  imports: [
    GamesListComponent,
    AdminGameListComponent,
    GameCategoryListComponent,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule,
    QRCodeModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule,
    AngularEditorModule,
    NgxPaginationModule
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
    },
    QuillModule.forRoot(),
    GameCategoryListComponent,
    GameKeyListComponent,
    MatFormFieldModule,
    MatDialogModule,
    GameReviewListComponent
    
    
      
    


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
