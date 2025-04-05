import { ChangeDetectorRef, Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Payment } from 'src/app/core/entities/finance/payment.model';
import { Purchase } from 'src/app/core/entities/finance/purchase.model';
import { PaymentService } from 'src/services/finance/Crud/payment.service';
import { PurchaseService } from 'src/services/finance/Crud/purchase.service';

@Component({
  selector: 'app-request-refund',
  templateUrl: './request-refund.component.html',
  styleUrls: ['./request-refund.component.css']
})
export class RequestRefundComponent {


  purchases: Purchase[] = [];
  sortOrder: string = 'new-old';
  selectedPurchaseId: number | null = null;
  refundReason: string = '';

  constructor(public activeModal: NgbActiveModal , private purchaseService: PurchaseService,    private cdr: ChangeDetectorRef) {}


  loadPurchases(): void {
    this.purchaseService.getAllPurchases().subscribe({
      next: (data) => {
        this.purchases = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching purchases:', error);
      }
    });
  }

  ngOnInit(): void {
    this.loadPurchases();
    this.sortPayments(this.sortOrder);
  }

  sortPayments(order: string): void {
    this.purchases.sort((a, b) => {
      if (order === 'new-old') {
        return b.createdAt.getTime() - a.createdAt.getTime();
      } else {
        return a.createdAt.getTime() - b.createdAt.getTime();
      }
    });
  }

  requestRefund(purchasetId: number): void {
    this.selectedPurchaseId = purchasetId;
  }

  submitRefund(): void {
    if (this.selectedPurchaseId && this.refundReason.trim()) {
      // Handle refund submission
      console.log('Refund submitted:', {
        paymentId: this.selectedPurchaseId,
        reason: this.refundReason
      });
      this.activeModal.close('refund_submitted');
    }
  }
}
