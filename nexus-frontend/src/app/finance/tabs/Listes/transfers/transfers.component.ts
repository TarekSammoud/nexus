// transfers.component.ts
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Transfer } from 'src/app/core/entities/finance/transfer.model';
import { NexusWallet } from 'src/app/core/entities/finance/wallet.model';
import { TransferService } from 'src/services/finance/Crud/transfer.service';
import { WalletService } from 'src/services/finance/Crud/wallet.service';
import { MetamaskService } from 'src/services/finance/metamask.service';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.css']
})
export class TransfersComponent implements OnInit {
  transfers: Transfer[] = [];
  selectedTransferId: number = 0;
  //fetch wallet by wallet id
  conectedWallet: NexusWallet ={} ;
  connectdWalletPk : String = '' ;

  constructor(
    private transferService: TransferService,
    private cdr: ChangeDetectorRef,
    private metamaksService: MetamaskService,
  ) {}

  ngOnInit(): void {
    this.loadTransfers();
  }

 async loadTransfers(): Promise<void> {
  this.connectdWalletPk= await this.metamaksService.getWalletAddress() || '' ;
      this.transferService.getTransfersByWalletPK( this.connectdWalletPk).subscribe({
      next: (data) => {
        this.transfers = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching transfers:', error);
      }
    }
    );
    
    }
 



  setSelectedTransfer(transferId: number): void {
    this.selectedTransferId = transferId;
  }

  deleteItem(id: number): void {
    this.transfers = this.transfers.filter(transfer => transfer.id !== id);
    this.cdr.detectChanges();

    this.transferService.deleteTransfer(id).subscribe({
      next: () => {
        //console.log('Transfer deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting transfer:', error);
        this.loadTransfers();
      }
    });
  }
}