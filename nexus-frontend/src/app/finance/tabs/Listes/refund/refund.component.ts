// refund.component.ts
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Refund } from 'src/app/core/entities/finance/refund.model';
import { RefundService } from 'src/services/finance/Crud/refund.service';
import { MetamaskService } from 'src/services/finance/metamask.service';
import { WalletDashboardService } from 'src/services/finance/wallet-dashboard.service';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.css']
})
export class RefundComponent implements OnInit {
  refunds: Refund[] = [];
  selectedRefundId: number = 0;
  connectdWalletPk : String = '' ;


  constructor(
    private refundService: RefundService,
    private cdr: ChangeDetectorRef,
        private metamaksService: MetamaskService,
    
  ) {}

  ngOnInit(): void {
    this.loadRefunds();
  }


  async loadRefunds(): Promise<void> {

    this.connectdWalletPk= await this.metamaksService.getWalletAddress() || '' ;

    this.refundService.getRefundsByWalletPK(this.connectdWalletPk).subscribe({
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
        //console.log('Refund deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting refund:', error);
        this.loadRefunds();
      }
    });
  }
}