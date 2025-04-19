import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { productType, Purchase } from 'src/app/core/entities/finance/purchase.model';
import { NexusWallet } from 'src/app/core/entities/finance/wallet.model';
import { TokenService } from 'src/app/core/services/user-management/token.service';
import { WalletService } from 'src/services/finance/Crud/wallet.service';
import { MetamaskService } from 'src/services/finance/metamask.service';

@Component({
  selector: 'app-wallet-dashboard',
  templateUrl: './wallet-dashboard.component.html',
  styleUrls: ['./wallet-dashboard.component.css']
})
export class WalletDashboardComponent {
  constructor(private router: Router,private walletService: WalletService ,private metamaskService :MetamaskService,private tokenService:TokenService) {}
  connectedwallet: NexusWallet | undefined;
  error: string | undefined;
connectedWalletAddress: string = ''
UserBalance: string = '0';
ngOnInit() {
  this.fetchWallet(); // Fetch the wallet when the component initializes
  this.ininitializeContract();
  
}

async ininitializeContract() {
  await this.metamaskService.connectWallet();
   const publicKey = this.connectedwallet?.metamaskPublicKey || '';
   this.UserBalance = (await this.metamaskService.getBalance(publicKey)) || '0';

}

  navigateToPayment() {
    this.router.navigate(['/makePayment']);  // Corrected: Pass the path inside an array
  }


   purchase: Purchase = {
    productType: productType.GAME, // ✅ Not a string
    productId: 0,
    price: 0
  };

 

  async fetchWallet() {
const userId = TokenService.getUserId(); // Get the user ID from the token service

    this.walletService.getWalletByUserId( userId).subscribe({
      next: (data) => {
        this.connectedwallet = data;
        this.error = '';
        console.log('Wallet fetched successfully:', this.connectedwallet);
      },
      error: (err) => {
        this.connectedwallet = undefined;
        this.error = err.error;
        console.error('Error fetching wallet:', this.error);
      }
    });
  }


}
