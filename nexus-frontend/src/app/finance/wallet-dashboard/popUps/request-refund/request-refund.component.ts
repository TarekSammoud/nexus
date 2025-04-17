import { ChangeDetectorRef, Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Payment } from 'src/app/core/entities/finance/payment.model';
import { Purchase } from 'src/app/core/entities/finance/purchase.model';
import { Refund } from 'src/app/core/entities/finance/refund.model';
import { PaymentService } from 'src/services/finance/Crud/payment.service';
import { PurchaseService } from 'src/services/finance/Crud/purchase.service';
import { RefundService } from 'src/services/finance/Crud/refund.service';

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

  constructor(public activeModal: NgbActiveModal , private purchaseService: PurchaseService,    private cdr: ChangeDetectorRef,private refundService :RefundService) {}


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
        return (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0);
      } else {
        return (a.createdAt?.getTime() ?? 0) - (b.createdAt?.getTime() ?? 0);
      }
    });
  }

  requestRefund(purchasetId: number): void {
    this.selectedPurchaseId = purchasetId;
  }

  refund :Refund={
    reason: "",
    status: 'Pending',
    refundAmount: 0,
  }
  submitRefund(): void {
    if (this.selectedPurchaseId && this.refundReason.trim()) {
      // Handle refund submission
      console.log('Refund submitted:', {
        paymentId: this.selectedPurchaseId,
        reason: this.refundReason
      });
      this.refund.reason = this.refundReason;
      this.refund.refundAmount = this.purchases.find(p => p.id === this.selectedPurchaseId)?.price || 0;
      // Call the refund service to create the refund
      this.refundService.createAndAffectToPurchases(this.selectedPurchaseId,this.refund).subscribe({});
      this.activeModal.close('refund_submitted');
    }
  }
}
