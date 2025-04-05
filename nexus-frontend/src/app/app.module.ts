import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GamesCarouselComponent } from './games/games-carousel/games-carousel.component';
import { GamesComponent } from './games/games/games.component';
import { HttpClientModule } from '@angular/common/http';
import { WalletDashboardComponent } from './finance/wallet-dashboard/wallet-dashboard.component';
import { TabsComponent } from './finance/tabs/tabs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ConnectWalletComponent } from './finance/connect-wallet/connect-wallet.component';
import { PaymentsComponent } from './finance/tabs/Listes/payments/payments.component';
import { PurchaseComponent } from './finance/tabs/Listes/purchase/purchase.component';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MakePaymentComponent } from './finance/make-payment/make-payment.component';
import { CommonModule } from '@angular/common';
import { PanierComponent } from './finance/panier/panier/panier.component';
import { TransferPopupComponent } from './finance/wallet-dashboard/popUps/transfer-popup/transfer-popup.component';
import { TasksListPopupComponent } from './finance/wallet-dashboard/popUps/tasks-list-popup/tasks-list-popup.component';
import { RequestRefundComponent } from './finance/wallet-dashboard/popUps/request-refund/request-refund.component';
import { TransfersComponent } from './finance/tabs/Listes/transfers/transfers.component';
import { RefundComponent } from './finance/tabs/Listes/refund/refund.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GamesCarouselComponent,
    GamesComponent,
    WalletDashboardComponent,
    TabsComponent,
    ConnectWalletComponent,
    PaymentsComponent,
    PurchaseComponent,
    MakePaymentComponent,
    PanierComponent,
    TransferPopupComponent,
    TasksListPopupComponent,
    RequestRefundComponent,
    TransfersComponent,
    RefundComponent,   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // <-- Add FormsModule to the imports array
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TabsModule.forRoot(),
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
