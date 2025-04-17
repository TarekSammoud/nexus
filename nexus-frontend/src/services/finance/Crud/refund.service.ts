// refund.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from 'src/app/core/entities/finance/purchase.model';
import { Refund } from 'src/app/core/entities/finance/refund.model';

@Injectable({
  providedIn: 'root'
})
export class RefundService {
  private baseUrl = 'http://localhost:9000/nexus-backend/refund';

  constructor(private http: HttpClient) {}

  getAllRefunds(): Observable<Refund[]> {
    return this.http.get<Refund[]>(`${this.baseUrl}/getAll`);
  }

  deleteRefund(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
    updateRefund(refund: Refund): Observable<Refund> {
      return this.http.put<Refund>(`${this.baseUrl}/update`, refund);
    }
      createAndAffectToPurchases(purchaseId: Number , refund: Refund): Observable<Refund> {
        const url = `${this.baseUrl}/create-affect/${purchaseId}`;
        return this.http.post<Refund>(url, refund);
      }
           getRefundsByWalletPK(metamaskPublicKey: String | null): Observable<Refund[]> {
              return this.http.get<Refund[]>(`${this.baseUrl}/getByWalletPK/${metamaskPublicKey}`);
            }
}