import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BidService } from '../services/bid.service';
import { TokenService } from 'src/app/core/services/user-management/token.service'; // ✅ Import normal

import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css']
})
export class BidComponent implements OnInit, OnDestroy {
  marketId!: number;
  bids: any[] = [];
  newBidAmount: number = 0;
  currentUserId!: number;
  message: string = '';

  private refreshSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private bidService: BidService
    // ❌ Pas besoin d'injecter private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.marketId = Number(this.route.snapshot.paramMap.get('id'));
    this.currentUserId = TokenService.getUserId()!; // ✅ Appeler directement TokenService.getUserId()
    this.loadBids();

    // Auto-refresh
    this.refreshSubscription = interval(5000).subscribe(() => {
      this.loadBids();
    });
  }

  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

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
