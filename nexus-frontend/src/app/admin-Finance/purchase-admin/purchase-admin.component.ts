// purchase-admin.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Purchase } from 'src/app/core/entities/finance/purchase.model';
import { PurchaseService } from 'src/services/finance/Crud/purchase.service';

@Component({
  selector: 'app-purchase-admin',
  templateUrl: './purchase-admin.component.html',
  styleUrls: ['./purchase-admin.component.css']
})
export class PurchaseAdminComponent implements OnInit {
  currentUser: string = 'hamdounisabri1';
  currentDate: string = new Date().toISOString();
  
  purchases: Purchase[] = [];
  filteredPurchases: Purchase[] = [];
  private purchaseSubject = new Subject<void>();
  private subscription: Subscription = new Subscription();

  // Statistics
  totalGamePurchases: number = 0;
  totalItemPurchases: number = 0;
  totalPurchases: number = 0;

  // Search
  searchPurchaseId: number | null = null;

  // Dialogs
  deleteConfirmation: { show: boolean, purchaseId: number | null } = { show: false, purchaseId: null };

  constructor(private purchaseService: PurchaseService) {}

  ngOnInit() {

        this.loadPurchases();


  }



  loadPurchases(): void {
    this.purchaseService.getAllPurchases().subscribe({
      next: (data) => {
        this.purchases = data;
        this.filteredPurchases = data;
        this.calculateStatistics();
      },
      error: (error) => {
        console.error('Error fetching purchases:', error);
      }
    });
  }

  calculateStatistics(): void {
    this.totalGamePurchases = this.purchases.filter(p => p.productType === 'GAME').length;
    this.totalItemPurchases = this.purchases.filter(p => p.productType === 'GAME_ITEM').length;
    this.totalPurchases = this.purchases.length;  
  }

  searchById(): void {
    if (!this.searchPurchaseId) {
      this.filteredPurchases = [...this.purchases];
    } else {
      this.filteredPurchases = this.purchases.filter(
        purchase => (purchase.id?.toString() ?? '').includes(this.searchPurchaseId!.toString())
      );
    }
  }

  showDeleteConfirmation(purchaseId: number): void {
    this.deleteConfirmation = { show: true, purchaseId };
  }

  hideDeleteConfirmation(): void {
    this.deleteConfirmation = { show: false, purchaseId: null };
  }

  deletePurchase(purchaseId: number): void {
    this.purchaseService.deletePurchase(purchaseId).subscribe({
      next: () => {
        this.purchaseSubject.next();
        this.hideDeleteConfirmation();
      },
      error: (error) => {
        console.error('Error deleting purchase:', error);
        this.hideDeleteConfirmation();
      }
    });
  }
}