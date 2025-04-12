import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user-management/login/login.component';
import { SignupComponent } from './user-management/signup/signup.component';
import { GamesComponent } from './games/games/games.component';
import { UserProfileComponent } from './user-management/user-profile/user-profile.component';
import { HeaderComponent } from './header/header.component';
import { EditProfileComponent } from './user-management/edit-profile/edit-profile.component';
import { FriendManagementComponent } from './user-management/friend-management/friend-management.component';
import { FriendRequestListComponent } from './user-management/friend-request-list/friend-request-list.component'
import { ChatComponent } from './user-management/chat/chat.component'


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Page par défaut : login
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'games', component: GamesComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'user-profile/:id', component: UserProfileComponent },
  { path: 'edit-profile/:id', component: EditProfileComponent },
  { path: 'your-your-friends/:id', component: FriendManagementComponent },
  { path: 'friend-requests/:id', component: FriendRequestListComponent },
  { path: 'chat/:id', component: ChatComponent }, // Route de messagerie,,


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
