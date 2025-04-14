import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user-management/login/login.component';
import { SignupComponent } from './user-management/signup/signup.component';
import { GamesComponent } from './games/games/games.component';


import { UserProfileComponent } from './user-management/user-profile/user-profile.component';
import { HeaderComponent } from './header/header.component';
import { EditProfileComponent } from './user-management/edit-profile/edit-profile.component';
import { FriendManagementComponent } from './user-management/friend-management/friend-management.component';
import { FriendRequestListComponent } from './user-management/friend-request-list/friend-request-list.component';
import { ChatComponent } from './user-management/chat/chat.component';

import { AuthGuard } from '../app/core/services/user-management/auth.guard';
import { ForgotPasswordComponent } from './user-management/forgot-password/forgot-password.component';


import { HomeComponent } from './home/home/home.component';
import { JamsListComponent } from './jams/jams-list/jams-list.component';
import { JamsComponent } from './jams/jams/jams.component';
import { JamDetailsPageComponent } from './jams/entries/jam-details-page/jam-details-page.component';
import { GamePageComponent } from './games/game-page/game-page.component';
import { CreateGameComponent } from './games/create-game/create-game.component';
import { GameGridComponent } from './games/game-grid/game-grid.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { GameCategoriesComponent } from './game-categories/game-categories.component';
import { GamesListComponent } from './games/gameslist/games-list/games-list.component';
import { AdminGameListComponent } from './admin-game-list/admin-game-list.component';
import { CreateGameCategoryComponent } from './games/create-game-category/create-game-category.component';
import { GameCategoryListComponent } from './game-category-list/game-category-list.component';
import { SupportAgentComponent } from './support/support-agent/support-agent.component';
import { RoomComponent } from './support/room/room.component';

import { RoomChatComponent } from './support/room-chat/room-chat.component';
import { PerformanceReviewComponent } from './support/performance-review/performance-review.component';
import { SupportTicketComponent } from './support/support-ticket/support-ticket.component';
import { AdminSupportListComponent } from './admin-support/admin-support-list/admin-support-list.component';
import { AdminPerformanceReviewComponent } from './admin-support/admin-performance-review/admin-performance-review.component';
import { AdminRoomComponent } from './admin-support/admin-room/admin-room.component';
import { AdminAgentSupportComponent } from './admin-support/admin-agent-support/admin-agent-support.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },

  { path: 'games', component: GamesComponent, canActivate: [AuthGuard] },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard] },
  { path: 'your-friends', component: FriendManagementComponent, canActivate: [AuthGuard] },
  { path: 'friend-requests', component: FriendRequestListComponent, canActivate: [AuthGuard] },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
  {
    path: 'admin',
    component: AdminHomeComponent, // has the sidebar
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'games/categories', component: GameCategoryListComponent },
      { path: 'games/list', component: AdminGameListComponent },
      { path: 'update-game/:id', component: CreateGameComponent },
      { path: 'update-game-category/:id', component: CreateGameCategoryComponent },
      { path: 'add-new-game', component: CreateGameComponent },
      { path: 'games/:id', component: GamePageComponent },
      { path: 'games/categories/add-new-category', component: CreateGameCategoryComponent },
      { path: 'support-agent', component: AdminAgentSupportComponent },
      { path: 'room', component: AdminRoomComponent },
      { path: 'performance-review', component: AdminPerformanceReviewComponent },
      { path: 'support/list_ticket', component: AdminSupportListComponent },


    ]
  },
  { path: '', component: HomeComponent },
  { path: 'jams', component: JamsComponent },
  { path: 'jam/:id', component: JamDetailsPageComponent },
  { path: '', component: HomeComponent },
  { path: 'games/:id', component: GamePageComponent },
  { path: 'category/:name', component: GameGridComponent },
  { path: 'admin', component: AdminHomeComponent },
  { path: 'admin/categories', component: GameCategoriesComponent },
  { path: 'admin/games/list', component: CreateGameComponent, outlet: 'adminOutlet' },
  { path: 'games', component: GamesComponent },
  { path: 'support-tickets', component: SupportTicketComponent },
  { path: 'room/:roomId', component: RoomChatComponent },
  { path: 'performance-reviews', component: PerformanceReviewComponent }  // Add this route 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


