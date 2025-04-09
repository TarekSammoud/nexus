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

import { HomeComponent } from './home/home/home.component';
import { CarouselModule } from '@syncfusion/ej2-angular-navigations';
import { GamesListComponent } from './games/gameslist/games-list/games-list.component';
import { GamePageComponent } from './games/game-page/game-page.component';
import { CreateGameComponent } from './games/create-game/create-game.component';
import { CreateGameCategoryComponent } from './games/create-game-category/create-game-category.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GameGridComponent } from './games/game-grid/game-grid.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { GameCategoriesComponent } from './game-categories/game-categories.component';
import { AdminGameListComponent } from './admin-game-list/admin-game-list.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { QuillModule } from 'ngx-quill';
import { GameCategoryListComponent } from './game-category-list/game-category-list.component';
import { WalletsComponent } from './admin-Finance/wallets/wallets.component';
import { PaymentsAdminComponent } from './admin-Finance/payments-admin/payments-admin.component';
import { PurchaseAdminComponent } from './admin-Finance/purchase-admin/purchase-admin.component';
import { TransfersAdminComponent } from './admin-Finance/transfers-admin/transfers-admin.component';
import { RefundAdminComponent } from './admin-Finance/refund-admin/refund-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
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
    HomeComponent,
    GamesCarouselComponent,
    GamePageComponent,
    CreateGameComponent,
    CreateGameCategoryComponent,
    GameGridComponent,
    AdminHomeComponent,
    GameCategoriesComponent,
    GameCategoryListComponent,
    WalletsComponent,
    PaymentsAdminComponent,
    PurchaseAdminComponent,
    TransfersAdminComponent,
    RefundAdminComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TabsModule.forRoot(),
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    CarouselModule,
    MatChipsModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule,
    AngularEditorModule,
    QuillModule.forRoot(),
    GamesListComponent,
    AdminGameListComponent


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
