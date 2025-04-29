import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// UI & Libs
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from '@syncfusion/ej2-angular-navigations';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { QRCodeModule } from 'angularx-qrcode';

// Angular Material


// Core Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { HomeComponent } from './home/home/home.component';

// Finance Components
import { WalletDashboardComponent } from './finance/wallet-dashboard/wallet-dashboard.component';
import { TabsComponent } from './finance/tabs/tabs.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ConnectWalletComponent } from './finance/connect-wallet/connect-wallet.component';
import { PaymentsComponent } from './finance/tabs/Listes/payments/payments.component';
import { PurchaseComponent } from './finance/tabs/Listes/purchase/purchase.component';
import { MakePaymentComponent } from './finance/make-payment/make-payment.component';
import { PanierComponent } from './finance/panier/panier/panier.component';
import { TransferPopupComponent } from './finance/wallet-dashboard/popUps/transfer-popup/transfer-popup.component';
import { RequestRefundComponent } from './finance/wallet-dashboard/popUps/request-refund/request-refund.component';
import { TransfersComponent } from './finance/tabs/Listes/transfers/transfers.component';
import { RefundComponent } from './finance/tabs/Listes/refund/refund.component';

// Games & Game Categories
import { GamesCarouselComponent } from './games/games-carousel/games-carousel.component';
import { GamesListComponent } from './games/gameslist/games-list/games-list.component';
import { GamePageComponent } from './games/game-page/game-page.component';
import { CreateGameComponent } from './games/create-game/create-game.component';
import { CreateGameCategoryComponent } from './games/create-game-category/create-game-category.component';
import { GameGridComponent } from './games/game-grid/game-grid.component';
import { GameCategoriesComponent } from './game-categories/game-categories.component';
import { AdminGameListComponent } from './admin-game-list/admin-game-list.component';
import { GameReviewListComponent } from './game-review-list/game-review-list.component';
import { GameKeyListComponent } from './games/game-key-list/game-key-list.component';

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

// Community Components
import { PublicationListComponent } from './community/publication-list/publication-list.component';
import { PublicationFormComponent } from './community/publication-form/publication-form.component';
import { ReportListComponent } from './community/report-list/report-list.component';
import { ReportFormComponent } from './community/report-form/report-form.component';
import { SondageCreateComponent } from './community/sondage/sondage-create/sondage-create.component';
import { SondageListComponent } from './community/sondage/sondage-list/sondage-list.component';
import { SondageLiveComponent } from './community/sondage/sondage-live/sondage-live.component';
import { SondageAdminComponent } from './community/sondage/sondage-admin/sondage-admin.component';
import { StreamerManagementComponent } from './community/sondage/streamer-management/streamer-management.component';
import { LiveRoomComponent } from './community/sondage/live-room/live-room.component';
import { PublicationStatsComponent } from './community/publication-stats/publication-stats.component';
import { TopStreamerComponent } from './community/sondage/top-streamer/top-streamer.component';

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
import { UserDashboardComponent } from './user-management/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './user-management/admin-dashboard/admin-dashboard.component';
import { UserProfileComponent } from './user-management/user-profile/user-profile.component';
import { EditProfileComponent } from './user-management/edit-profile/edit-profile.component';
import { FriendManagementComponent } from './user-management/friend-management/friend-management.component';
import { ChatComponent } from './user-management/chat/chat.component';


import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';



// Market & Support
import { MarketListComponent } from './market/market-list/market-list.component';
import { MarketCreateComponent } from './market/market-create/market-create.component';
import { MarketEditComponent } from './market/market-edit/market-edit.component';
import { BidComponent } from './market/bid/bid.component';
import { MarketDetailsComponent } from './market/market-details/market-details.component';
import { SupportTicketComponent } from './support/support-ticket/support-ticket.component';
import { RoomComponent } from './support/room/room.component';
import { PerformanceReviewComponent } from './support/performance-review/performance-review.component';
import { SupportAgentComponent } from './support/support-agent/support-agent.component';
import { RoomChatComponent } from './support/room-chat/room-chat.component';
import { AdminSupportListComponent } from './admin-support/admin-support-list/admin-support-list.component';
import { AdminAgentSupportComponent } from './admin-support/admin-agent-support/admin-agent-support.component';
import { AdminPerformanceReviewComponent } from './admin-support/admin-performance-review/admin-performance-review.component';
import { AdminRoomComponent } from './admin-support/admin-room/admin-room.component';

// Services & Interceptors
import { TokenService } from '../app/core/services/user-management/token.service';
import { JwtInterceptor } from '../app/core/services/user-management/jwt.interceptor';
import { AuthInterceptor } from '../app/core/services/user-management/auth.interceptor';

// External Libraries
import { ToastrModule } from 'ngx-toastr';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgChartsModule } from 'ng2-charts';
import { CategoryListComponent } from './community/category-list/category-list.component';
import { CategoryFormComponent } from './community/category-form/category-form.component';
import { LibraryComponent } from './library/library.component';
import { CreateBrowserGameComponent } from './create-browser-game/create-browser-game.component';
import { BrowserGamePageComponent } from './browser-game-page/browser-game-page.component';
import { KeenGameCarouselComponent } from './keen-game-carousel/keen-game-carousel.component';
import { GamesNavComponent } from './games-nav/games-nav.component';
import { EmulatedGameComponent } from './emulated-game/emulated-game.component';
import { CreateEmulatedGameComponent } from './create-emulated-game/create-emulated-game.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';
import { CreateDiscountComponent } from './create-discount/create-discount.component';
import { JamCalendarComponent } from './jams/jam-calendar/jam-calendar.component';
import { AiRecommendationComponent } from './market/ai-recommendation/ai-recommendation.component';
import { WalletsComponent } from './admin-Finance/wallets/wallets.component';
import { PaymentsAdminComponent } from './admin-Finance/payments-admin/payments-admin.component';
import { PurchaseAdminComponent } from './admin-Finance/purchase-admin/purchase-admin.component';
import { TransfersAdminComponent } from './admin-Finance/transfers-admin/transfers-admin.component';
import { RefundAdminComponent } from './admin-Finance/refund-admin/refund-admin.component';
import { NotificationBannerComponent } from './finance/notification-banner/notification-banner.component';
import { TestComponent } from './finance/test/test/test.component';
import { GeneratePdfComponent } from './finance/wallet-dashboard/popUps/generate-pdf/generate-pdf.component';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { SupportComponent } from './support/support.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AdminHomeComponent,
    HeaderComponent,
    FooterComponent,
    WalletDashboardComponent,
    TabsComponent,
    ConnectWalletComponent,
    PaymentsComponent,
    PurchaseComponent,
    MakePaymentComponent,
    PanierComponent,
    TransferPopupComponent,
    RequestRefundComponent,
    TransfersComponent,
    RefundComponent,
    HomeComponent,
    GamesCarouselComponent,
    GamePageComponent,
    CreateGameComponent,
    CreateGameCategoryComponent,
    GameGridComponent,
    PublicationFormComponent,
    CategoryListComponent,
    CategoryFormComponent,
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
    ReportListComponent,
    ReportFormComponent,
    SondageCreateComponent,
    SondageListComponent,
    SondageLiveComponent,
    SondageAdminComponent,
    StreamerManagementComponent,
    LiveRoomComponent,
    PublicationStatsComponent,
    AdminJamsListComponent,
    AdminJamEditComponent,
    AdminJamDetailsComponent,
    AdminEntriesListComponent,
    AdminJamMediaListComponent,
    AdminJamRatingsListComponent,
    VipJamFormComponent,
    PublicationListComponent,
    LoginComponent,
    SignupComponent,
    SupportComponent,

    ForgotPasswordComponent,
    UserListComponent,
    UserDetailsComponent,
    UserFormComponent,
    UserAvatarComponent,
    FriendRequestListComponent,
    FriendRequestActionsComponent,
    BlockedUsersComponent,
    NotificationsComponent,
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
    LibraryComponent,
    CreateBrowserGameComponent,
    BrowserGamePageComponent,
    KeenGameCarouselComponent,
    GamesNavComponent,
    EmulatedGameComponent,
    CreateEmulatedGameComponent,
    NotFoundComponent,
    AboutComponent,
    CreateDiscountComponent,
    JamCalendarComponent,
    TopStreamerComponent,
    AiRecommendationComponent,
    WalletsComponent,
    PaymentsAdminComponent,
    PurchaseAdminComponent,
    TransfersAdminComponent,
    RefundAdminComponent,
    NotificationBannerComponent,
    TestComponent,
    GeneratePdfComponent
  ],
  imports: [
    MatSelectModule,
    MatOptionModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    CarouselModule,
    AngularEditorModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    TabsModule.forRoot(),
    MatNativeDateModule,
    MatChipsModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatDialogModule,
    NgxPaginationModule,
    QRCodeModule,
    NgChartsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    FullCalendarModule,
    RouterModule
  ],
  providers: [
    TokenService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
