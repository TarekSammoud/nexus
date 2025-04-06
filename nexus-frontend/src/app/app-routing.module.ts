import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesCarouselComponent } from './games/games-carousel/games-carousel.component';
import { GamesComponent } from './games/games/games.component';
import { WalletDashboardComponent } from './finance/wallet-dashboard/wallet-dashboard.component';
import { ConnectWalletComponent } from './finance/connect-wallet/connect-wallet.component';
import { MakePaymentComponent } from './finance/make-payment/make-payment.component';
import { PanierComponent } from './finance/panier/panier/panier.component';
import { HomeComponent } from './home/home/home.component';
import { GamePageComponent } from './games/game-page/game-page.component';
import { CreateGameComponent } from './games/create-game/create-game.component';
import { GameGridComponent } from './games/game-grid/game-grid.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { GameCategoriesComponent } from './game-categories/game-categories.component';
import { GamesListComponent } from './games/gameslist/games-list/games-list.component';
import { AdminGameListComponent } from './admin-game-list/admin-game-list.component';
import { CreateGameCategoryComponent } from './games/create-game-category/create-game-category.component';
import { GameCategoryListComponent } from './game-category-list/game-category-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'games', component: GamesComponent },
  { path: 'games/:id', component: GamePageComponent },
  { path: 'category/:name', component: GameGridComponent },
  { path: 'wallet', component: WalletDashboardComponent },
  { path: 'connectWallet', component: ConnectWalletComponent },
  { path: 'makePayment', component: MakePaymentComponent },
  { path: 'panier', component: PanierComponent },
  
  {
    path: 'admin',
    component: AdminHomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'games/categories', component: GameCategoryListComponent },
      { path: 'games/list', component: AdminGameListComponent },
      { path: 'update-game/:id', component: CreateGameComponent },
      { path: 'add-new-game', component: CreateGameComponent },
      { path: 'games/categories/add-new-category', component: CreateGameCategoryComponent }
    ]
  },

  { path: 'admin/categories', component: GameCategoriesComponent },
  { path: 'admin/games/list', component: CreateGameComponent, outlet: 'adminOutlet' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
