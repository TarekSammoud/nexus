import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = '/api/nexus-backend';

@Injectable({
  providedIn: 'root'
})
export class BidService {


  constructor(private http: HttpClient) {}

  // ✅ Get all bids for a specific market listing
  getBidsForMarketListing(listingId: number): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/marketlistings/${listingId}/bids`);
  }
  getHighestBid(listingId: number): Observable<number> {
    return this.http.get<number>(`${BASE_URL}/marketlistings/${listingId}/bids/highest`);
  }
  // ✅ Place a new bid
  placeBid(bid: any): Observable<any> {
    return this.http.post(`${BASE_URL}/bids`, bid);
  }

  // ✅ Update a bid
  updateBid(id: number, bid: any): Observable<any> {
    return this.http.put(`${BASE_URL}/bids/${id}`, bid);
  }

  // ✅ Delete a bid
  deleteBid(id: number): Observable<any> {
    return this.http.delete(`${BASE_URL}/bids/${id}`);
  }

  // ✅ Get a single bid by ID
  getBidById(id: number): Observable<any> {
    return this.http.get(`${BASE_URL}/bids/${id}`);
  }
}
