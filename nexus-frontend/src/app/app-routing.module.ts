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

import { UserProfileComponent } from './user-management/user-profile/user-profile.component';
import { EditProfileComponent } from './user-management/edit-profile/edit-profile.component';
import { FriendManagementComponent } from './user-management/friend-management/friend-management.component';
import { FriendRequestListComponent } from './user-management/friend-request-list/friend-request-list.component';
import { ChatComponent } from './user-management/chat/chat.component';

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

import { AuthGuard } from './core/services/user-management/auth.guard';
import { LibraryComponent } from './library/library.component';

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
  { path: 'games', component: GamesComponent },
  { path: 'games/:id', component: GamePageComponent },
  { path: 'category/:name', component: GameGridComponent },

  // 🎤 Support
  { path: 'support-tickets', component: SupportTicketComponent },
  { path: 'room/:roomId', component: RoomChatComponent },
  { path: 'performance-reviews', component: PerformanceReviewComponent },

  // 🏪 Market
  { path: 'market', component: MarketListComponent },
  { path: 'market/create', component: MarketCreateComponent },
  { path: 'market/edit/:id', component: MarketEditComponent },
  { path: 'market/:id/bid', component: BidComponent },

  // 🧩 Jams
  { path: 'jams', component: JamsComponent },
  { path: 'jam/:id', component: JamDetailsPageComponent },
  { path: 'vip-jams', component: VipJamsListComponent },


  { path: 'community', component: PublicationListComponent },
  { path: 'community/add', component: PublicationFormComponent },
  { path: 'community/edit/:id', component: PublicationFormComponent },
  { path: 'report/create/:publicationId', component: ReportFormComponent },
  { path: 'sondages/create', component: SondageCreateComponent },
  { path: 'sondages/list', component: SondageListComponent },
  { path: 'live-room/:id', component: LiveRoomComponent },
  { path: 'stats', component: PublicationStatsComponent },


  // 🛠 Admin
  {
    path: 'admin',
    component: AdminHomeComponent,

    children: [
      { path: '', redirectTo: 'games/list', pathMatch: 'full' },
      { path: 'games/list', component: AdminGameListComponent },
      { path: 'games/categories', component: GameCategoryListComponent },
      { path: 'games/categories/add-new-category', component: CreateGameCategoryComponent },
      { path: 'games/keys', component: GameKeyListComponent },
      { path: 'games/reviews', component: GameReviewListComponent },
      { path: 'games/:id', component: GamePageComponent },
      { path: 'add-new-game', component: CreateGameComponent },
      { path: 'update-game/:id', component: CreateGameComponent },
      { path: 'update-game-category/:id', component: CreateGameCategoryComponent },

      { path: 'update-game/:id', component: CreateGameComponent },
      { path: 'update-game-category/:id', component: CreateGameCategoryComponent },
      { path: 'add-new-game', component: CreateGameComponent },
      { path: 'games/:id', component: GamePageComponent },
      { path: 'games/categories/add-new-category', component: CreateGameCategoryComponent },
      { path: 'community/categories', component: CategoryListComponent },
      { path: 'community/categories/add', component: CategoryFormComponent },
      { path: 'community/categories/edit/:id', component: CategoryFormComponent },
      { path: 'community/reports', component: ReportListComponent },
      { path: 'sondages', component: SondageAdminComponent },
      { path: 'streamers', component: StreamerManagementComponent },
      { path: 'live', component: SondageLiveComponent },



      { path: 'support-agent', component: AdminAgentSupportComponent },
      { path: 'room', component: AdminRoomComponent },
      { path: 'performance-review', component: AdminPerformanceReviewComponent },
      { path: 'support/list_ticket', component: AdminSupportListComponent },

      { path: 'jams/list', component: AdminJamsListComponent },
      { path: 'jams/edit/:id', component: AdminJamEditComponent },
      { path: 'jams/details/:id', component: AdminJamDetailsComponent },
      { path: 'jams/entries', component: AdminEntriesListComponent },
      { path: 'jams/media', component: AdminJamMediaListComponent },
      { path: 'jams/ratings', component: AdminJamRatingsListComponent },
      { path: 'jams/vip', component: VipJamFormComponent }
    ]
  },

  { path: '', component: HomeComponent },
  { path: 'jams', component: JamsComponent },
  { path: 'jam/:id', component: JamDetailsPageComponent },
  { path: 'games/:id', component: GamePageComponent },
  { path: 'category/:name', component: GameGridComponent },
  { path: 'admin/categories', component: GameCategoriesComponent },
  { path: 'admin/games/list', component: CreateGameComponent, outlet: 'adminOutlet' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
