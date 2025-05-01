// purchase.component.ts
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Purchase, productType } from 'src/app/core/entities/finance/purchase.model';
import { PurchaseService } from 'src/services/finance/Crud/purchase.service';
import { MetamaskService } from 'src/services/finance/metamask.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  purchases: Purchase[] = [];
  selectedPurchaseId: number = 0;
  currentUser: string = 'hamdounisabri1';
  currentDate: string = '2025-04-04 16:21:48';
  productType = productType; // For enum use in template
  connectdWalletPk : String = '' ;

  constructor(
    private purchaseService: PurchaseService,
    private cdr: ChangeDetectorRef,
    private metamaksService: MetamaskService,
    
  ) {}

  ngOnInit(): void {
    this.loadPurchases();
  }

  isGameType(type: productType): boolean {
    return type === productType.GAME;
  }
  
  async loadPurchases(): Promise<void> {
    this.connectdWalletPk= await this.metamaksService.getWalletAddress() || '' ;
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

  setSelectedPurchase(purchaseId: number): void {
    this.selectedPurchaseId = purchaseId;
  }

  deleteItem(id: number): void {
    // Remove from UI immediately
    this.purchases = this.purchases.filter(purchase => purchase.id !== id);
    this.cdr.detectChanges(); // Force UI update

    // Then make API call
    this.purchaseService.deletePurchase(id).subscribe({
      next: () => {
        //console.log('Purchase deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting purchase:', error);
        // Reload purchases on error to ensure UI is in sync
        this.loadPurchases();
      },
      complete: () => {
        // Reload the list after successful deletion
        this.loadPurchases();
      }
    });
  }
}