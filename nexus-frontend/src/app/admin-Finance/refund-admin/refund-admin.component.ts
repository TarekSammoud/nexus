// refund-admin.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Refund } from 'src/app/core/entities/finance/refund.model';
import { RefundService } from 'src/services/finance/Crud/refund.service';

@Component({
  selector: 'app-refund-admin',
  templateUrl: './refund-admin.component.html',
  styleUrls: ['./refund-admin.component.css']
})
export class RefundAdminComponent implements OnInit, OnDestroy {
  currentUser: string = 'hamdounisabri1';
  currentDate: string = new Date().toISOString();
  
  refunds: Refund[] = [];
  filteredRefunds: Refund[] = [];
  private refundSubject = new Subject<void>();
  private subscription: Subscription = new Subscription();

  // Statistics
  totalRefunds: number = 0;
  totalRefundAmount: number = 0;
  acceptedRate: number = 0;
  failureRate: number = 0;
  pendingCount: number = 0;

  // Search
  searchRefundId: number | null = null;

  // Dialogs
  deleteConfirmation: { show: boolean, refundId: number | null } = { show: false, refundId: null };
  updateDialogData: { show: boolean, refund: Refund | null } = { show: false, refund: null };

  constructor(private refundService: RefundService) {}

  ngOnInit() {
    this.subscription.add(
      this.refundSubject.subscribe(() => {
        this.loadRefunds();
      })
    );
    
    this.loadRefunds();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadRefunds(): void {
    this.refundService.getAllRefunds().subscribe({
      next: (data) => {
        this.refunds = data;
        this.filteredRefunds = data;
        this.calculateStatistics();
      },
      error: (error) => {
        console.error('Error fetching refunds:', error);
      }
    });
  }

  calculateStatistics(): void {
    this.totalRefunds = this.refunds.length;
    this.totalRefundAmount = this.refunds
      .filter(r => r.status === 'Accepted')
      .reduce((sum, refund) => sum + refund.refundAmount, 0);
    
    const acceptedRefunds = this.refunds.filter(r => r.status === 'Accepted').length;
    const failedRefunds = this.refunds.filter(r => r.status === 'Failed').length;
    this.pendingCount = this.refunds.filter(r => r.status === 'Pending').length;
    
    this.acceptedRate = (acceptedRefunds / this.totalRefunds) * 100;
    this.failureRate = (failedRefunds / this.totalRefunds) * 100;
  }

  searchById(): void {
    if (!this.searchRefundId) {
      this.filteredRefunds = [...this.refunds];
    } else {
      this.filteredRefunds = this.refunds.filter(
        refund => refund.id.toString().includes(this.searchRefundId!.toString())
      );
    }
  }

  showUpdateDialog(event: MouseEvent, refund: Refund): void {
    const target = event.target as HTMLElement;
    if (target.closest('.delete-btn') || target.closest('.fa-trash-alt')) {
      return;
    }
    
    this.updateDialogData = {
      show: true,
      refund: { ...refund }
    };
  }

  hideUpdateDialog(): void {
    this.updateDialogData = { show: false, refund: null };
  }

  showDeleteConfirmation(refundId: number): void {
    this.deleteConfirmation = { show: true, refundId };
  }

  hideDeleteConfirmation(): void {
    this.deleteConfirmation = { show: false, refundId: null };
  }

  updateRefund(): void {
    if (this.updateDialogData.refund && this.updateDialogData.refund.id) {
      this.refundService.updateRefund(
        this.updateDialogData.refund,
      ).subscribe({
        next: () => {
          this.refundSubject.next();
          this.hideUpdateDialog();
        },
        error: (error) => {
          console.error('Error updating refund:', error);
          this.hideUpdateDialog();
        }
      });
    }
  }

  deleteRefund(refundId: number): void {
    this.refundService.deleteRefund(refundId).subscribe({
      next: () => {
        this.refundSubject.next();
        this.hideDeleteConfirmation();
      },
      error: (error) => {
        console.error('Error deleting refund:', error);
        this.hideDeleteConfirmation();
      }
    });
  }
}