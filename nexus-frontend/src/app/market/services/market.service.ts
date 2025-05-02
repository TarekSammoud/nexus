import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = '/api/nexus-backend/marketlistings';

@Injectable({
  providedIn: 'root'
})
export class MarketService {
  constructor(private http: HttpClient) {}

  getAllListings(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}`);
  }

  getListingById(id: number): Observable<any> {
    return this.http.get(`${BASE_URL}/${id}`);
  }

  createListing(data: any): Observable<any> {
    return this.http.post(`${BASE_URL}`, data);
  }


  updateListing(id: number, data: any): Observable<any> {
    return this.http.put(`${BASE_URL}/${id}`, data);

  }

  deleteListing(id: number): Observable<any> {
    return this.http.delete(`${BASE_URL}/${id}`);
  }

  getBidsForListing(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/${id}/bids`);
  }

  placeBid(id: number, bid: any): Observable<any> {
    return this.http.post(`${BASE_URL}/${id}/bid`, bid);
  }
}
