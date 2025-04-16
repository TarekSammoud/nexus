// refund.component.ts
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Refund } from 'src/app/core/entities/finance/refund.model';
import { RefundService } from 'src/services/finance/Crud/refund.service';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.css']
})
export class RefundComponent implements OnInit {
  refunds: Refund[] = [];
  selectedRefundId: number = 0;
  currentUser: string = 'hamdounisabri1';
  currentDate: string = '2025-04-04 17:55:31';

  constructor(
    private refundService: RefundService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadRefunds();
  }

  loadRefunds(): void {
    this.refundService.getAllRefunds().subscribe({
      next: (data) => {
        this.refunds = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching refunds:', error);
      }
    });
  }

  setSelectedRefund(refundId: number): void {
    this.selectedRefundId = refundId;
  }

  deleteItem(id: number): void {
    this.refunds = this.refunds.filter(refund => refund.id !== id);
    this.cdr.detectChanges();

    this.refundService.deleteRefund(id).subscribe({
      next: () => {
        console.log('Refund deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting refund:', error);
        this.loadRefunds();
      }
    });
  }
}