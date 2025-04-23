import { Component } from '@angular/core';
import { NexusWallet } from 'src/app/core/entities/finance/wallet.model';
import { WalletService } from 'src/services/finance/Crud/wallet.service';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.css']
})
export class WalletsComponent {

 constructor  (private walletService : WalletService) { }

 deleteConfirmation: { show: boolean, walletId: number | null } = { show: false, walletId: null };
 updateDialogData: {show: boolean; wallet: NexusWallet | null;} = { show: false, wallet: null };
   ngOnInit(): void {
    this.loadWallets();
    this.calculateStatistics();

  }

  showDeleteConfirmation(walletId: number): void {
    this.deleteConfirmation = { show: true, walletId };
  }
  showUpdateDialog(event: MouseEvent, wallet: NexusWallet): void {
    const target = event.target as HTMLElement;
    if (target.closest('.delete-btn') || target.closest('.fa-trash-alt')) {
      return;
    }
    this.updateDialogData = {
      show: true,
      wallet: { ...wallet }
    };
  }
  hideDeleteConfirmation(): void {
    this.deleteConfirmation = { show: false, walletId: null };
  }
  hideUpdateDialog(): void {
    this.updateDialogData = { show: false, wallet: null };
  }

  deleteWallet(walletId: number): void {
    this.walletService.deleteWallet(walletId).subscribe({
      next: () => {
        this.wallets = this.wallets.filter(w => w.id !== walletId);
        this.filteredWallets = this.filteredWallets.filter(w => w.id !== walletId);
        this.calculateStatistics();
        this.hideDeleteConfirmation();
      },
      error: (error) => {
        console.error('Error deleting wallet:', error);
        this.hideDeleteConfirmation();
      }
    });
  }

  updateWallet(): void {
    if (this.updateDialogData.wallet) {
      this.walletService.updateWallet(this.updateDialogData.wallet).subscribe({
        next: (updatedWallet) => {
          const index = this.wallets.findIndex(w => w.id === updatedWallet.id);
          if (index !== -1) {
            this.wallets[index] = updatedWallet;
            this.filteredWallets = [...this.wallets];
            this.calculateStatistics();
          }
          this.hideUpdateDialog();
        },
        error: (error) => {
          console.error('Error updating wallet:', error);
          this.hideUpdateDialog();
        }
      });
    }
  }


  
  searchWalletId: number | null = null;

  totalWallets: number = 0;
  totalCoins: number = 0;
  averageBalance: number = 0;
  wallets: NexusWallet[] = [];
  filteredWallets: NexusWallet[] = [];
  

  loadWallets(): void {
    this.walletService.getAllWallets().subscribe({
      next: (data) => {
        this.wallets = data;
        this.filteredWallets = data;
        this.calculateStatistics();
      },
      error: (error) => {
        console.error('Error fetching wallets:', error);
      }
    });
  }



  searchById(): void {
    if (!this.searchWalletId) {
      this.filteredWallets = [...this.wallets];
    } else {
      this.filteredWallets = this.wallets.filter(
        wallet => (wallet.id?.toString() ?? '').includes(this.searchWalletId!.toString())
      );
    }
  }

  private calculateStatistics(): void {
    this.totalWallets = this.wallets.length;
    this.totalCoins = this.wallets.reduce((sum, wallet) => sum + (wallet.coinBalance ?? 0), 0);
    this.averageBalance = this.totalWallets > 0 ? this.totalCoins / this.totalWallets : 0;
  }
}
