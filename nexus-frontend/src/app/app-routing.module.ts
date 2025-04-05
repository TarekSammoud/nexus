import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesCarouselComponent } from './games/games-carousel/games-carousel.component';
import { GamesComponent } from './games/games/games.component';
import { WalletDashboardComponent } from './finance/wallet-dashboard/wallet-dashboard.component';
import { ConnectWalletComponent } from './finance/connect-wallet/connect-wallet.component';
import { MakePaymentComponent } from './finance/make-payment/make-payment.component';
import { PanierComponent } from './finance/panier/panier/panier.component';

const routes: Routes = [
  {path: 'games', component: GamesComponent},
  {path: 'wallet', component: WalletDashboardComponent},
  {path: 'connectWallet', component: ConnectWalletComponent},
  {path: 'makePayment', component: MakePaymentComponent},
  {path: 'panier', component: PanierComponent},

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
