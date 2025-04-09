// refund.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}