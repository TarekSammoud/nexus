import { Component, ViewEncapsulation } from '@angular/core';
import { ethers, Wallet } from 'ethers';
import { NexusWallet } from 'src/app/core/entities/finance/wallet.model';
import { WalletService } from 'src/services/finance/Crud/wallet.service';
import { MetamaskService } from 'src/services/finance/metamask.service';

@Component({
  selector: 'app-connect-wallet',
  templateUrl: './connect-wallet.component.html',
  styleUrls: ['./connect-wallet.component.css'],
  encapsulation: ViewEncapsulation.None  // Disable View Encapsulation
})
export class ConnectWalletComponent {
  isLinear = false;  // Control stepper linearity
  walletAddress: string | null = null; // Update type to allow null
  walletBalance: string = '';
  errorMessage: string = '';
  isConnected: boolean = false;
  newWallet: NexusWallet = {
    coinBalance: 0,
  };   
  constructor(private metaMaskService: MetamaskService, private walletService: WalletService) {
    
  }
  ngOnInit(): void {
    
  }

  async connectWallet() {
    try {
      await this.metaMaskService.connectWallet();
      this.walletAddress = await this.metaMaskService.getAddress();      
      this.walletBalance = await this.metaMaskService.getBalance() || '0';

      this.isConnected = true;
      console.log('Connected wallet:', this.walletAddress);
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      this.errorMessage = 'Failed to connect wallet';
    }
  }
  createNewWallet(): void {
    
  this.newWallet.metamask_public_key = this.walletAddress || '0';

    this.walletService.createWallet(this.newWallet).subscribe({
      next: (wallet) => {
        console.log('Wallet created successfully:', wallet);

      },
      error: (error) => {
        console.error('Error creating wallet:', error);
        alert('Failed to create wallet!');
      }
    });
  }

}