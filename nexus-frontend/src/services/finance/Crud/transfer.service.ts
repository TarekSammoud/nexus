import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transfer } from 'src/app/core/entities/finance/transfer.model';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  private baseUrl = 'http://localhost:9000/nexus-backend/transfer';

  constructor(private http: HttpClient) {}

  getAllTransfers(): Observable<Transfer[]> {
    return this.http.get<Transfer[]>(`${this.baseUrl}/getAll`);
  }

  deleteTransfer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
  
}
