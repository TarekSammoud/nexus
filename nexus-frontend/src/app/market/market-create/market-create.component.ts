import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { MarketService } from '../services/market.service';
import { HttpClient } from '@angular/common/http';
import { TokenService } from 'src/app/core/services/user-management/token.service';

@Component({
  selector: 'app-market-create',
  templateUrl: './market-create.component.html',
  styleUrls: ['./market-create.component.css']
})
export class MarketCreateComponent implements OnInit {
  @Output() itemCreated = new EventEmitter<void>();

  market = {
    start_bid: 0,
    end_date: '',
    game_item_id: null
  };

  currentUserId!: number; // ✅ Store the connected user's ID

  gameItems: any[] = [];

  constructor(
    private marketService: MarketService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.currentUserId = TokenService.getUserId()!; // ✅ Get the logged-in user ID
    this.http.get<any[]>('http://nexus-backend.backend.svc.cluster.local:9000/nexus-backend/gameitem').subscribe(data => this.gameItems = data);
  }

  createItem(): void {
    // Validation to make sure a game item is selected
    if (!this.market.game_item_id) {
      alert("Please select a game item.");
      return;
    }

    const payload = {
      startBid: this.market.start_bid,
      endDate: this.market.end_date,
      user: { id: this.currentUserId }, // ✅ Automatically set user from TokenService
      item: { id: this.market.game_item_id }
    };

    this.marketService.createListing(payload).subscribe(() => {
      this.itemCreated.emit();
      this.market = { start_bid: 0, end_date: '', game_item_id: null };
    });
  }
}
