import { Component } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Transfer } from 'src/app/core/entities/finance/transfer.model';
import { NexusWallet } from 'src/app/core/entities/finance/wallet.model';
import { TransferService } from 'src/services/finance/Crud/transfer.service';
import { WalletService } from 'src/services/finance/Crud/wallet.service';

@Component({
  selector: 'app-transfers-admin',
  templateUrl: './transfers-admin.component.html',
  styleUrls: ['./transfers-admin.component.css']
})
export class TransfersAdminComponent {

  
  transfers: Transfer[] = [];
  filteredTransfers: Transfer[] = [];
  senderWallet : NexusWallet | null = null;
  // Statistics
  totalTransfers: number = 0;
  totalAmountTransferred: number = 0;
  averageTransferAmount: number = 0;
  // Search
  searchTransferId: number | null = null;
  // Dialogs
  deleteConfirmation: { show: boolean, transferId: number | null } = { show: false, transferId: null };

  constructor(private transferService: TransferService,private walletService :WalletService) {}

  ngOnInit() {
    this.loadTransfers();
  }



  loadTransfers(): void {
    this.transferService.getAllTransfers().subscribe({
      next: (data) => {
        // Only keep transfers where type is 'OUT'
        this.transfers = data.filter(transfer => transfer.type === 'OUT');
        this.filteredTransfers = [...this.transfers];
        this.calculateStatistics();
      },
      error: (error) => {
        console.error('Error fetching transfers:', error);
      }
    });
  }


  calculateStatistics(): void {
    this.totalTransfers = this.transfers.length;
    this.totalAmountTransferred = this.transfers.reduce((sum, transfer) => sum + transfer.amount, 0);
    this.averageTransferAmount = this.totalAmountTransferred / (this.transfers.length || 1);
  }

  searchById(): void {
    if (!this.searchTransferId) {
      this.filteredTransfers = [...this.transfers];
    } else {
      this.filteredTransfers = this.transfers.filter(
        transfer => (transfer.id?.toString() ?? '').includes(this.searchTransferId!.toString())
      );
    }
  }

  showDeleteConfirmation(transferId: number): void {
    this.deleteConfirmation = { show: true, transferId };
  }

  hideDeleteConfirmation(): void {
    this.deleteConfirmation = { show: false, transferId: null };
  }

  deleteTransfer(transferId: number): void {
    this.transferService.deleteTransfer(transferId).subscribe({
      next: () => {
        this.hideDeleteConfirmation();
      },
      error: (error) => {
        console.error('Error deleting transfer:', error);
        this.hideDeleteConfirmation();
      }
    });
  }
}
