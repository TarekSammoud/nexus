import { Component } from '@angular/core';
import { ethers } from 'ethers';
import { Payment } from 'src/app/core/entities/finance/payment.model';
import { PaymentService } from 'src/services/finance/Crud/payment.service';
import { MetamaskService } from 'src/services/finance/metamask.service';

@Component({
  selector: 'app-payments-admin',
  templateUrl: './payments-admin.component.html',
  styleUrls: ['./payments-admin.component.css']
})
export class PaymentsAdminComponent {

  currentUser: string = 'hamdounisabri1';
  currentDate: string = '2025-04-07 21:28:36';
  searchPaymentId: number | null = null;
  
  payments: Payment[] = [];
  filteredPayments: Payment[] = [];
  
  // Statistics
  totalRevenue: number = 0;
  totalCoinsPurchased: number = 0;
  contractBalance: String = "";

  // Dialogs
  deleteConfirmation: { show: boolean, paymentId: number | null } = { show: false, paymentId: null };
  updateDialogData: { show: boolean, payment: Payment | null } = { show: false, payment: null };

  constructor(private paymentService: PaymentService,private metamaskService:MetamaskService) {}

  ngOnInit(): void {
    this.loadPayments();
    this.getContractBalnce()
  }

  async getContractBalnce() {
   await this.metamaskService.connectWallet()

   const get= await this.metamaskService.getContractBalance()
   const GETether = ethers.formatEther(get.toString())
   this.contractBalance = GETether
   console.log("contract balance",GETether)

  }
  loadPayments(): void {
    this.paymentService.getAllPayments().subscribe({
      next: (data) => {
        this.payments = data;
        this.filteredPayments = data;
        this.calculateStatistics();
      },
      error: (error) => {
        console.error('Error fetching payments:', error);
      }
    });
  }

  calculateStatistics(): void {
    this.totalRevenue = this.payments.reduce((sum, payment) => sum + Number(payment.price), 0);
    this.totalCoinsPurchased = this.payments.reduce((sum, payment) => sum + payment.coinAmount, 0);
    

  }

  showUpdateDialog(event: MouseEvent, payment: Payment): void {
    const target = event.target as HTMLElement;
    if (target.closest('.delete-btn') || target.closest('.fa-trash-alt')) {
      return;
    }
    
    this.updateDialogData = {
      show: true,
      payment: { ...payment }
    };
  }

  hideUpdateDialog(): void {
    this.updateDialogData = { show: false, payment: null };
  }

  showDeleteConfirmation(paymentId: number): void {
    this.deleteConfirmation = { show: true, paymentId };
  }

  hideDeleteConfirmation(): void {
    this.deleteConfirmation = { show: false, paymentId: null };
  }

  updatePayment(): void {
    if (this.updateDialogData.payment && this.updateDialogData.payment.id) {
      this.paymentService.updatePayment(
        this.updateDialogData.payment,
        
      ).subscribe({
        next: (updatedPayment) => {
          const index = this.payments.findIndex(p => p.id === updatedPayment.id);
          if (index !== -1) {
            this.payments[index] = updatedPayment;
            this.filteredPayments = this.payments.map(p => 
              p.id === updatedPayment.id ? updatedPayment : p
            );
            this.calculateStatistics();
          }
          this.hideUpdateDialog();
        },
        error: (error) => {
          console.error('Error updating payment:', error);
          this.hideUpdateDialog();
        }
      });
    }
  }

  deletePayment(paymentId: number): void {
    this.paymentService.deletePayment(paymentId).subscribe({
      next: () => {
        this.payments = this.payments.filter(p => p.id !== paymentId);
        this.filteredPayments = this.filteredPayments.filter(p => p.id !== paymentId);
        this.calculateStatistics();
        this.hideDeleteConfirmation();
      },
      error: (error) => {
        console.error('Error deleting payment:', error);
        this.hideDeleteConfirmation();
      }
    });
  }

  searchById(): void {
    if (!this.searchPaymentId) {
      this.filteredPayments = [...this.payments];
    } else {
      this.filteredPayments = this.payments.filter(
        payment => (payment.id?.toString() ?? '').includes(this.searchPaymentId!.toString())
      );
    }
  }
  async withdraw() {
    const tx = await this.metamaskService.withdrawEther()
}
  // withdraw contract balance to the owner address
}
