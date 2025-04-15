import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { MarketService } from '../services/market.service';
import { HttpClient } from '@angular/common/http';

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
    user_id: null,
    game_item_id: null
  };

  users: any[] = [];
  gameItems: any[] = [];

  constructor(private marketService: MarketService, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:9000/nexus-backend/users').subscribe(data => this.users = data);
    this.http.get<any[]>('http://localhost:9000/nexus-backend/gameitem').subscribe(data => this.gameItems = data);
  }

  createItem(): void {
    // Validation to make sure both are selected
    if (!this.market.user_id || !this.market.game_item_id) {
      alert("Please select both a user and a game item.");
      return;
    }

    const payload = {
      startBid: this.market.start_bid,
      endDate: this.market.end_date,
      user: { id: this.market.user_id },
      item: { id: this.market.game_item_id }
    };

    this.marketService.createListing(payload).subscribe(() => {
      this.itemCreated.emit();
      this.market = { start_bid: 0, end_date: '', user_id: null, game_item_id: null };
    });
  }

}
