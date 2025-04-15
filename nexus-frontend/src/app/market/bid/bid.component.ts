import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BidService } from '../services/bid.service';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css']
})
export class BidComponent implements OnInit {
  marketId!: number;
  bids: any[] = [];
  newBidAmount: number = 0;
  currentUserId: number = 2; // Simulated user for now
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private bidService: BidService
  ) {}

  ngOnInit(): void {
    this.marketId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadBids();
  }

  // Load all bids for a specific market listing
  loadBids(): void {
    this.bidService.getBidsForMarketListing(this.marketId).subscribe({
      next: (data) => {
        this.bids = data;
      },
      error: (err) => {
        console.error('Error loading bids:', err);
      }
    });
  }

  // Place a new bid
  placeBid(): void {
    if (this.newBidAmount <= 0) {
      this.message = '❌ Bid amount must be greater than 0';
      return;
    }

    const bidPayload = {
      amount: this.newBidAmount,
      createdAt: new Date(),
      isWinningBid: false,
      user: { id: this.currentUserId },
      marketListing: { id: this.marketId }
    };

    this.bidService.placeBid(bidPayload).subscribe({
      next: () => {
        this.message = '✅ Bid placed!';
        this.newBidAmount = 0;
        this.loadBids();
      },
      error: (err) => {
        this.message = '❌ Error placing bid';
        console.error('Bid error:', err);
      }
    });
  }
}
