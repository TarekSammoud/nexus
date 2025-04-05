import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NexusWallet } from 'src/app/core/entities/finance/wallet.model';
import { WalletService } from 'src/services/finance/Crud/wallet.service';

@Component({
  selector: 'app-wallet-dashboard',
  templateUrl: './wallet-dashboard.component.html',
  styleUrls: ['./wallet-dashboard.component.css']
})
export class WalletDashboardComponent {
  constructor(private router: Router,private walletService: WalletService) {}
    connectedwallet: NexusWallet | undefined;
  error: string | undefined;
ngOnInit() {
  this.getWalletById(); // Fetch the wallet when the component initializes
}

  navigateToPayment() {
    this.router.navigate(['/makePayment']);  // Corrected: Pass the path inside an array
  }

  getWalletById() {
    const walletId = 63; // Set the wallet ID you want to fetch
    this.walletService.getWalletById(walletId).subscribe(
      (data) => {
        this.connectedwallet = data; // Assign the fetched wallet to the component variable
      },
      (err) => {
        this.error = 'Failed to fetch wallet data'; 
        console.error(err);
      }
    );
  }
}
