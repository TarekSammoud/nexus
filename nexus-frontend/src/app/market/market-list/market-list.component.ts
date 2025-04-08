import { Component, OnInit } from '@angular/core';
import { MarketService } from '../services/market.service';

@Component({
  selector: 'app-market-list',
  templateUrl: './market-list.component.html',
  styleUrls: ['./market-list.component.css']
})
export class MarketListComponent implements OnInit {
  markets: any[] = [];
  selectedItem: any = null;
  showForm = false;
  editMode = false;
  page = 1;

  constructor(private marketService: MarketService) {}

  ngOnInit(): void {
    this.loadMarketItems();
  }

  loadMarketItems(): void {
    this.marketService.getAllListings().subscribe(data => {
      this.markets = data;
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  onItemCreated(): void {
    this.showForm = false;
    this.loadMarketItems();
  }

  viewDetails(item: any): void {
    this.selectedItem = item;
    this.editMode = false;
  }

  editItem(item: any): void {
    this.selectedItem = item;
    this.editMode = true;
  }

  updateItem(): void {
    this.editMode = false;
    this.selectedItem = null;
    this.loadMarketItems();
  }

  closeDetails(): void {
    this.selectedItem = null;
    this.editMode = false;
  }

  deleteItem(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.marketService.deleteListing(id).subscribe(() => {
        this.loadMarketItems();
      });
    }
  }
}
