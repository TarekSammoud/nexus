// payment.component.ts
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/core/entities/finance/payment.model';
import { PaymentService } from 'src/services/finance/Crud/payment.service';
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  payments: Payment[] = [];
  selectedPaymentId: number = 0;

  constructor(private paymentService: PaymentService,) {}

  ngOnInit(): void {
    this.loadPayments();
  }
  setSelectedPayment(paymentId: number): void {
    this.selectedPaymentId = paymentId;
  }

  loadPayments(): void {
    this.paymentService.getAllPayments().subscribe({
      next: (data) => {
        this.payments = data;
      },
      error: (error) => {
        console.error('Error fetching payments:', error);
      }
    });
  }



  deleteItem(id: number): void {
    // First update UI
    this.payments = this.payments.filter(payment => payment.id !== id);

    // Then make API call
    this.paymentService.deletePayment(id).subscribe({
      next: () => {
        // Success - UI is already updated
        console.log('Payment deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting payment:', error);
        // On error, reload the payments to ensure UI is in sync with server
        this.loadPayments();
      }
    });
  }


}