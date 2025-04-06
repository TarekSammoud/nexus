import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user-management/login/login.component';
import { SignupComponent } from './user-management/signup/signup.component';
import { GamesComponent } from './games/games/games.component';
import { UserProfileComponent } from './user-management/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Page par défaut : login
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'games', component: GamesComponent },
  { path: 'user-profile', component: UserProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
