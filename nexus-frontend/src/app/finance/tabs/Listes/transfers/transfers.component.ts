// transfers.component.ts
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Transfer } from 'src/app/core/entities/finance/transfer.model';
import { TransferService } from 'src/services/finance/Crud/transfer.service';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.css']
})
export class TransfersComponent implements OnInit {
  transfers: Transfer[] = [];
  selectedTransferId: number = 0;
  currentUser: string = 'hamdounisabri1';
  currentDate: string = '2025-04-04 17:34:38';

  constructor(
    private transferService: TransferService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTransfers();
  }

  loadTransfers(): void {
    this.transferService.getAllTransfers().subscribe({
      next: (data) => {
        this.transfers = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching transfers:', error);
      }
    });
  }

  setSelectedTransfer(transferId: number): void {
    this.selectedTransferId = transferId;
  }

  deleteItem(id: number): void {
    this.transfers = this.transfers.filter(transfer => transfer.id !== id);
    this.cdr.detectChanges();

    this.transferService.deleteTransfer(id).subscribe({
      next: () => {
        console.log('Transfer deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting transfer:', error);
        this.loadTransfers();
      }
    });
  }
}