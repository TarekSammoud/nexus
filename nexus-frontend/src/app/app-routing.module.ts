import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user-management/login/login.component';
import { SignupComponent } from './user-management/signup/signup.component';
import { GamesComponent } from './games/games/games.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Page par défaut : login
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'games', component: GamesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
