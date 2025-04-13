import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NexusWallet } from 'src/app/core/entities/finance/wallet.model';
import { WalletService } from 'src/services/finance/Crud/wallet.service';
import { MetamaskService } from 'src/services/finance/metamask.service';

@Component({
  selector: 'app-wallet-dashboard',
  templateUrl: './wallet-dashboard.component.html',
  styleUrls: ['./wallet-dashboard.component.css']
})
export class WalletDashboardComponent {
  constructor(private router: Router,private walletService: WalletService ,private metamaskService :MetamaskService) {}
  connectedwallet: NexusWallet | undefined;
  error: string | undefined;
connectedWalletAddress: string = ''
UserBalance: string = '0';
ngOnInit() {
  this.ininitializeContract();
  this.connectedWalletAddress = this.metamaskService.getWalletAddress() || ''; // Get the connected wallet address from the service
  this.fetchWallet(); // Fetch the wallet when the component initializes
}

async ininitializeContract() {
  await this.metamaskService.connectWallet();
  await this.metamaskService.initializeContract();
 this.UserBalance = (await this.metamaskService.getBalance(this.connectedWalletAddress)) || '0';

}

  navigateToPayment() {
    this.router.navigate(['/makePayment']);  // Corrected: Pass the path inside an array
  }

  async fetchWallet() {


    this.walletService.getWalletByPublicKey( this.connectedWalletAddress).subscribe({
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
