import { Component, ViewEncapsulation } from '@angular/core';
import { ethers, Wallet } from 'ethers';
import { NexusWallet } from 'src/app/core/entities/finance/wallet.model';
import { WalletService } from 'src/services/finance/Crud/wallet.service';
import { MetamaskService } from 'src/services/finance/metamask.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/services/user-management/token.service';

@Component({
  selector: 'app-connect-wallet',
  templateUrl: './connect-wallet.component.html',
  styleUrls: ['./connect-wallet.component.css'],
  encapsulation: ViewEncapsulation.None  // Disable View Encapsulation
})
export class ConnectWalletComponent {
  isLinear = false;  // Control stepper linearity
  walletAddress: string = ''; // Update type to allow null
  walletBalance: string = '';
  errorMessage: string = '';
  isConnected: boolean = false;
  walletExists: boolean | null = null;

  isLoading: boolean = false; // Used to show the progress spinner

  
  newWallet: NexusWallet = {
    coinBalance: 0,
  };   
  constructor(private metaMaskService: MetamaskService,
     private walletService: WalletService, private router: Router,
    private tokenService: TokenService)  { }


  ngOnInit(): void {
    
  }

  async connectWallet() {
    try {
      const [address, balance] = await this.metaMaskService.connectWallet();
      this.walletAddress = this.metaMaskService.getWalletAddress() || ''; // Update type to allow null
      this.walletBalance = balance || '0'; // Update type to allow null

      this.isConnected = true;
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      this.errorMessage = 'Failed to connect wallet';
    }
  }
  
  async createNewWallet(): Promise<void> {
    const userId = TokenService.getUserId() ?? 0; // Ensure userId is a number, default to 0 if null

   let isWalletExist = await this.metaMaskService.userExists(this.walletAddress);
    if (!isWalletExist) {
      try {
        const addUserResult =await this.metaMaskService.addUser(this.walletAddress || '');

        // Check the result of the addUser function
        if (addUserResult === 'User added successfully') {
          //console.log('User added successfully:', this.walletAddress);
          // Proceed with creating the wallet after the user is added
          this.newWallet.metamaskPublicKey = this.walletAddress || '0';

          this.walletService.createAndAssignWallet(userId,this.newWallet).subscribe({
            next: (wallet) => {
              //console.log('Wallet created successfully:', wallet);

            },
            error: (error) => {
              console.error('Error creating wallet:', error);
              alert('Failed to create wallet!');
            }
          });
        } else {
          console.error('Failed to add user:', addUserResult);
          alert("Connect Your Wallet!"); 
        }
      } catch (error) {
        console.error('Error adding user:', error);
        alert('An error occurred while adding the user!');
      }
    } else {
      this.router.navigate(['/wallet']); // Navigate to wallet dashboard after creating the wallet
    }
  }
}