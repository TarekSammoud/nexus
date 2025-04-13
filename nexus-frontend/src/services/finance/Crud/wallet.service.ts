import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NexusWallet } from 'src/app/core/entities/finance/wallet.model';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  
  private baseUrl = 'http://localhost:9000/nexus-backend/wallet';

  constructor(private http: HttpClient) {}


  createWallet(wallet: NexusWallet): Observable<NexusWallet> {
    return this.http.post<NexusWallet>(`${this.baseUrl}/create`, wallet);
  }
  getAllWallets(): Observable<NexusWallet[]> {
    return this.http.get<NexusWallet[]>(`${this.baseUrl}/getAll`);
  }
  getWalletById(id: number): Observable<NexusWallet> {
    return this.http.get<NexusWallet>(`${this.baseUrl}/${id}`);
  }

  deleteWallet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
  updateWallet(wallet: NexusWallet,): Observable<NexusWallet> {
    return this.http.put<NexusWallet>(`${this.baseUrl}/update`, wallet);
  }

  getWalletByPublicKey(publicKey: string): Observable<NexusWallet> {
    return this.http.get<NexusWallet>(`${this.baseUrl}/findByPublicKey/${publicKey}`);
  }
}
