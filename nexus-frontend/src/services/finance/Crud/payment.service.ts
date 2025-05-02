// payment.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from 'src/app/core/entities/finance/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = '/api/nexus-backend/payment';

  constructor(private http: HttpClient) {}

  getAllPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.baseUrl}/getAll`);
  }

  deletePayment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
    updatePayment(payment: Payment,): Observable<Payment> {
      return this.http.put<Payment>(`${this.baseUrl}/update`, payment);
    }

    createPayment(payment: Payment): Observable<Payment> {
      return this.http.post<Payment>(`${this.baseUrl}/create`, payment);
    }
    createAndAffectPayment(metamaskPublicKey: string | null, payment: Payment): Observable<Payment> {
      const url = `${this.baseUrl}/create-affect/${metamaskPublicKey}`;
      return this.http.post<Payment>(url, payment);
    }
          getPaymentsByWalletPK(metamaskPublicKey: String | null): Observable<Payment[]> {
                    return this.http.get<Payment[]>(`${this.baseUrl}/getByWalletPK/${metamaskPublicKey}`);
           }
}