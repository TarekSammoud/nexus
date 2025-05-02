// purchase.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from 'src/app/core/entities/finance/purchase.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private baseUrl = '/api/nexus-backend/purchase';

  constructor(private http: HttpClient) {}

  getAllPurchases(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(`${this.baseUrl}/getAll`);
  }

  deletePurchase(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
  createAndAffectPurchase(metamaskPublicKey: string | null, purchase: Purchase): Observable<Purchase> {
    const url = `${this.baseUrl}/create-affect/${metamaskPublicKey}`;
    return this.http.post<Purchase>(url, purchase);
  }
  createAndAffectPurchases(metamaskPublicKey: string | null, purchases: Purchase[]): Observable<Purchase[]> {
    const url = `${this.baseUrl}/creates-affect/${metamaskPublicKey}`;
    return this.http.post<Purchase[]>(url, purchases);
  }
        getPurchasesByWalletPK(metamaskPublicKey: String | null): Observable<Purchase[]> {
                return this.http.get<Purchase[]>(`${this.baseUrl}/getByWalletPK/${metamaskPublicKey}`);
             }
  
  
}