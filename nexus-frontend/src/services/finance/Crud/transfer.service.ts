import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transfer } from 'src/app/core/entities/finance/transfer.model';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  private baseUrl = '/api/nexus-backend/transfer';

  constructor(private http: HttpClient) {}

  getAllTransfers(): Observable<Transfer[]> {
    return this.http.get<Transfer[]>(`${this.baseUrl}/getAll`);
  }

  deleteTransfer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
  createTransfer(transfer: Transfer): Observable<Transfer> {
    return this.http.post<Transfer>(`${this.baseUrl}/create`, transfer);
  }
      createAndAffectTransfer(metamaskPublicKey: String | null, transfer: Transfer): Observable<Transfer> {
        const url = `${this.baseUrl}/create-affect/${metamaskPublicKey}`;
        return this.http.post<Transfer>(url, transfer);
      }
     getTransfersByWalletPK(metamaskPublicKey: String | null): Observable<Transfer[]> {
        return this.http.get<Transfer[]>(`${this.baseUrl}/getByWalletPK/${metamaskPublicKey}`);
      }
}
