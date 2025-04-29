import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GamesCarouselComponent } from './games/games-carousel/games-carousel.component';
import { GamesComponent } from './games/games/games.component';

import { PublicationListComponent } from './community/publication-list/publication-list.component';
import { PublicationFormComponent } from './community/publication-form/publication-form.component';
import { ReportFormComponent } from './community/report-form/report-form.component';

import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './user-management/login/login.component';
import { SignupComponent } from './user-management/signup/signup.component';
import { ForgotPasswordComponent } from './user-management/forgot-password/forgot-password.component';

import { GamePageComponent } from './games/game-page/game-page.component';
import { CreateGameComponent } from './games/create-game/create-game.component';
import { GameGridComponent } from './games/game-grid/game-grid.component';
import { GamesListComponent } from './games/gameslist/games-list/games-list.component';
import { GameCategoriesComponent } from './game-categories/game-categories.component';
import { GameCategoryListComponent } from './game-category-list/game-category-list.component';
import { CreateGameCategoryComponent } from './games/create-game-category/create-game-category.component';
import { GameKeyListComponent } from './games/game-key-list/game-key-list.component';
import { GameReviewListComponent } from './game-review-list/game-review-list.component';
import { AdminGameListComponent } from './admin-game-list/admin-game-list.component';

import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminJamsListComponent } from './admin-jam/pages/admin-jams-list/admin-jams-list.component';
import { AdminJamEditComponent } from './admin-jam/pages/admin-jam-edit/admin-jam-edit.component';
import { AdminJamDetailsComponent } from './admin-jam/pages/admin-jam-details/admin-jam-details.component';
import { AdminEntriesListComponent } from './admin-jam/pages/admin-entries-list/admin-entries-list.component';
import { AdminJamMediaListComponent } from './admin-jam/pages/admin-jam-media-list/admin-jam-media-list.component';
import { AdminJamRatingsListComponent } from './admin-jam/pages/admin-jam-ratings/admin-jam-ratings-list.component';
import { VipJamFormComponent } from './admin-jam/pages/vip-jam-form/vip-jam-form.component';
import { CategoryListComponent } from './community/category-list/category-list.component';
import { CategoryFormComponent } from './community/category-form/category-form.component';
import { ReportListComponent } from './community/report-list/report-list.component';
import { SondageCreateComponent } from './community/sondage/sondage-create/sondage-create.component';
import { SondageListComponent } from './community/sondage/sondage-list/sondage-list.component';
import { SondageLiveComponent } from './community/sondage/sondage-live/sondage-live.component';
import { SondageAdminComponent } from './community/sondage/sondage-admin/sondage-admin.component';
import { StreamerManagementComponent } from './community/sondage/streamer-management/streamer-management.component';
import { LiveRoomComponent } from './community/sondage/live-room/live-room.component';
import { PublicationStatsComponent } from './community/publication-stats/publication-stats.component';


import { JamsComponent } from './jams/jams/jams.component';
import { JamsListComponent } from './jams/jams-list/jams-list.component';
import { JamDetailsPageComponent } from './jams/entries/jam-details-page/jam-details-page.component';
import { VipJamsListComponent } from './jams/vip-jams-list/vip-jams-list.component';
import { JamCalendarComponent } from './jams/jam-calendar/jam-calendar.component';

import { UserProfileComponent } from './user-management/user-profile/user-profile.component';
import { EditProfileComponent } from './user-management/edit-profile/edit-profile.component';
import { FriendManagementComponent } from './user-management/friend-management/friend-management.component';
import { FriendRequestListComponent } from './user-management/friend-request-list/friend-request-list.component';
import { ChatComponent } from './user-management/chat/chat.component';


import { WalletDashboardComponent } from './finance/wallet-dashboard/wallet-dashboard.component';
import { ConnectWalletComponent } from './finance/connect-wallet/connect-wallet.component';
import { MakePaymentComponent } from './finance/make-payment/make-payment.component';
import { PanierComponent } from './finance/panier/panier/panier.component';

import { WalletsComponent } from './admin-Finance/wallets/wallets.component';
import { PaymentsAdminComponent } from './admin-Finance/payments-admin/payments-admin.component';
import { PurchaseAdminComponent } from './admin-Finance/purchase-admin/purchase-admin.component';
import { TransfersAdminComponent } from './admin-Finance/transfers-admin/transfers-admin.component';
import { RefundAdminComponent } from './admin-Finance/refund-admin/refund-admin.component';

import { SupportAgentComponent } from './support/support-agent/support-agent.component';
import { RoomComponent } from './support/room/room.component';
import { SupportTicketComponent } from './support/support-ticket/support-ticket.component';
import { RoomChatComponent } from './support/room-chat/room-chat.component';
import { PerformanceReviewComponent } from './support/performance-review/performance-review.component';
import { AdminSupportListComponent } from './admin-support/admin-support-list/admin-support-list.component';
import { AdminAgentSupportComponent } from './admin-support/admin-agent-support/admin-agent-support.component';
import { AdminPerformanceReviewComponent } from './admin-support/admin-performance-review/admin-performance-review.component';
import { AdminRoomComponent } from './admin-support/admin-room/admin-room.component';

import { MarketListComponent } from './market/market-list/market-list.component';
import { MarketCreateComponent } from './market/market-create/market-create.component';
import { MarketEditComponent } from './market/market-edit/market-edit.component';
import { BidComponent } from './market/bid/bid.component';

import { LibraryComponent } from './library/library.component';
import { SupportComponent } from './support/support.component';
import { CreateBrowserGameComponent } from './create-browser-game/create-browser-game.component';
import { BrowserGamePageComponent } from './browser-game-page/browser-game-page.component';
import { KeenGameCarouselComponent } from './keen-game-carousel/keen-game-carousel.component';
import { EmulatedGameComponent } from './emulated-game/emulated-game.component';
import { CreateEmulatedGameComponent } from './create-emulated-game/create-emulated-game.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';
import { CreateDiscountComponent } from './create-discount/create-discount.component';
import { WsNotificationsService } from 'src/services/finance/ws-notifications.service';
import { TestComponent } from './finance/test/test/test.component';
import { TopStreamerComponent } from './community/sondage/top-streamer/top-streamer.component';


import { MarketDetailsComponent } from './market/market-details/market-details.component';
import { AiRecommendationComponent } from './market/ai-recommendation/ai-recommendation.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },

  // 🧍‍♂️ User
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard] },
  { path: 'your-friends', component: FriendManagementComponent, canActivate: [AuthGuard] },
  { path: 'friend-requests', component: FriendRequestListComponent, canActivate: [AuthGuard] },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },

  // 🎮 Games
  { path: 'games', component: GamesComponent, canActivate: [AuthGuard] },
  { path: 'games/:id', component: GamePageComponent },
  { path: 'category/:name', component: GameGridComponent },
  { path: 'library', component: LibraryComponent },

  // 🎤 Support
  { path: 'support-tickets', component: SupportTicketComponent },
  { path: 'room/:roomId', component: RoomChatComponent },
  { path: 'performance-reviews', component: PerformanceReviewComponent },
  { path: 'support', component: SupportComponent },

  // 🏪 Market
  { path: 'market', component: MarketListComponent },
  { path: 'market/create', component: MarketCreateComponent },
  { path: 'market/edit/:id', component: MarketEditComponent },
  { path: 'market/:id/bid', component: BidComponent },
  { path: 'market-details', component: MarketDetailsComponent },
  { path: 'ai-recommendation', component: AiRecommendationComponent },

  // 🧩 Jams
  { path: 'jams', component: JamsComponent },
  { path: 'jam/:id', component: JamDetailsPageComponent },
  { path: 'vip-jams', component: VipJamsListComponent },
  { path: 'calendar', component: JamCalendarComponent },

  // 🧑‍🤝‍🧑 Community
  { path: 'community', component: PublicationListComponent },
  { path: 'community/add', component: PublicationFormComponent },
  { path: 'community/edit/:id', component: PublicationFormComponent },
  { path: 'report/create/:publicationId', component: ReportFormComponent },
  { path: 'sondages/create', component: SondageCreateComponent },
  { path: 'sondages/list', component: SondageListComponent },
  { path: 'live-room/:id', component: LiveRoomComponent },
  { path: 'stats', component: PublicationStatsComponent },
  { path: 'support', component: SupportComponent },
  { path: 'top-streamer', component:TopStreamerComponent},



  // 💳 Finance
  { path: 'wallet', component: WalletDashboardComponent },
  { path: 'connectWallet', component: ConnectWalletComponent },
  { path: 'makePayment', component: MakePaymentComponent },
  { path: 'panier', component: PanierComponent },

  // 🛠 Admin
  {
    path: 'admin',
    component: AdminHomeComponent,
    canActivate: [RoleGuard],
    children: [
      { path: '', redirectTo: 'games/list', pathMatch: 'full' },
      { path: 'games/list', component: AdminGameListComponent },
      { path: 'games/categories', component: GameCategoryListComponent },
      { path: 'games/categories/add-new-category', component: CreateGameCategoryComponent },
      { path: 'games/keys', component: GameKeyListComponent },
      { path: 'games/create-discount/:id', component: CreateDiscountComponent },
      { path: 'games/create-discount/:id/:discount', component: CreateDiscountComponent },
      { path: 'games/reviews', component: GameReviewListComponent },
      { path: 'games/:id', component: GamePageComponent },
      { path: 'add-new-game', component: CreateGameComponent },
      { path: 'add-new-browser-game', component: CreateBrowserGameComponent },
      { path: 'add-new-emulated-game', component: CreateEmulatedGameComponent },
      { path: 'update-game/:id', component: CreateGameComponent },
      { path: 'update-game-category/:id', component: CreateGameCategoryComponent },

      // 🧑‍🤝‍🧑 Admin Community
      { path: 'community/categories', component: CategoryListComponent },
      { path: 'community/categories/add', component: CategoryFormComponent },
      { path: 'community/categories/edit/:id', component: CategoryFormComponent },
      { path: 'community/reports', component: ReportListComponent },
      { path: 'streamers', component: StreamerManagementComponent },

      // 🗳 Admin Sondages
      { path: 'sondages', component: SondageAdminComponent },
      { path: 'live', component: SondageLiveComponent },

      // 🎙 Admin Support
      { path: 'support-agent', component: AdminAgentSupportComponent },
      { path: 'room', component: AdminRoomComponent },
      { path: 'performance-review', component: AdminPerformanceReviewComponent },
      { path: 'support/list_ticket', component: AdminSupportListComponent },

      // 🎮 Admin Jams
      { path: 'jams/list', component: AdminJamsListComponent },
      { path: 'jams/edit/:id', component: AdminJamEditComponent },
      { path: 'jams/details/:id', component: AdminJamDetailsComponent },
      { path: 'jams/entries', component: AdminEntriesListComponent },
      { path: 'jams/media', component: AdminJamMediaListComponent },
      { path: 'jams/ratings', component: AdminJamRatingsListComponent },
      { path: 'jams/vip', component: VipJamFormComponent },

      { path: 'wallets', component: WalletsComponent },
      { path: 'payments', component: PaymentsAdminComponent },
      { path: 'purchases', component: PurchaseAdminComponent },
      { path: 'transfers', component: TransfersAdminComponent },
      { path: 'refunds', component: RefundAdminComponent },
    ]
  },

  { path: 'games/emulated/play/:name', component: EmulatedGameComponent, canActivate: [AuthGuard] },

  { path: '', component: HomeComponent },
  { path: 'jams', component: JamsComponent },
  { path: 'jam/:id', component: JamDetailsPageComponent },
  { path: 'games/:id', component: GamePageComponent },
  { path: 'category/:name', component: GameGridComponent },

  { path: 'games/play/:name', component: BrowserGamePageComponent, canActivate: [AuthGuard] },


  { path: 'about', component: AboutComponent },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },


  { path: '**', component: NotFoundComponent }, 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
