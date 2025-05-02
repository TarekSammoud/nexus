import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MarketService } from '../services/market.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-market-edit',
  templateUrl: './market-edit.component.html',
  styleUrls: ['./market-edit.component.css']
})
export class MarketEditComponent implements OnInit {
  @Input() item: any;
  @Output() itemUpdated = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  updatedData: any = {};
  gameItems: any[] = [];

  constructor(private marketService: MarketService, private http: HttpClient) {}

  ngOnInit(): void {
    this.updatedData = {
      id: this.item.id,
      start_bid: this.item.startBid,
      end_date: this.item.endDate,
      game_item_id: this.item.item?.id,
      user_id: this.item.user?.id // ✅ store it internally but do NOT modify it
    };

    this.http.get<any[]>('/api/nexus-backend/gameitem').subscribe(data => this.gameItems = data);
  }

  submitUpdate(): void {
    const payload = {
      id: this.updatedData.id,
      startBid: this.updatedData.start_bid,
      endDate: this.updatedData.end_date,
      user: { id: this.updatedData.user_id }, // ✅ re-send the same user
      item: { id: this.updatedData.game_item_id }
    };

    this.marketService.updateListing(payload.id, payload).subscribe(() => {
      this.itemUpdated.emit();
    });
  }

  cancelEdit(): void {
    this.cancel.emit();
  }
}
