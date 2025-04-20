import { ChangeDetectorRef, Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { switchMap } from 'rxjs';
import { Payment } from 'src/app/core/entities/finance/payment.model';
import { Purchase } from 'src/app/core/entities/finance/purchase.model';
import { Refund } from 'src/app/core/entities/finance/refund.model';
import { PaymentService } from 'src/services/finance/Crud/payment.service';
import { PurchaseService } from 'src/services/finance/Crud/purchase.service';
import { RefundService } from 'src/services/finance/Crud/refund.service';
import { GeminiService, RefundAnalysisResponse } from 'src/services/finance/gemini.service';
import { NotificationService } from 'src/services/finance/notification.service';

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

  constructor(public activeModal: NgbActiveModal ,
     private purchaseService: PurchaseService, 
        private cdr: ChangeDetectorRef,
        private refundService :RefundService,
        private geminiService :GeminiService,
        private notificationService :NotificationService
      
      ) {}


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
    status: 'Failed',
    refundAmount: 0,
  }
  updatePayload : Refund={
    reason: "",
    status: 'Failed',
    refundAmount: 0,
  }

  response?: RefundAnalysisResponse;
  error?: string;

  async submitRefund(): Promise<void> {
    if (this.selectedPurchaseId && this.refundReason.trim()) {
      this.refund.reason = this.refundReason;
      this.refund.refundAmount = this.purchases.find(p => p.id === this.selectedPurchaseId)?.price || 0;
  
      this.refundService.createAndAffectToPurchases(this.selectedPurchaseId, this.refund)
        .pipe(
          switchMap((createdRefund) => {
            if (createdRefund.id === undefined) {
              throw new Error('Refund creation did not return an id');
            }
            this.refund.id = createdRefund.id;
            console.log('Refund created:', createdRefund);
            return this.geminiService.analyzeRefund(createdRefund.id);
          })
        )
        .subscribe({
          next: (res) => {
            this.response = res;
            console.log('Analysis response:', res);
            this.notificationService.show("Your refund has been " + res.decision);
  
            if (res.decision === "APPROVED" && this.refund.id) {
              this.refundService.updateRefundStatus(this.refund.id).subscribe({
                next: () => {
                  console.log("Refund status updated!");
                  // Optionally update UI or state here
                },
                error: (err) => {
                  console.error("Failed to update refund status:", err);
                }
              });
            } else {
              console.log("Refund failed or id undefined");
            }
          },
          error: (err) => {
            this.error = 'Failed to process refund: ' + (err.error?.message || err.statusText);
            console.error(err);
          }
        });
    }
  }  
}
