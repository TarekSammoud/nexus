import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NexusWallet } from 'src/app/core/entities/finance/wallet.model';
import { MetamaskService } from '../metamask.service';
import { N } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  
  private baseUrl = 'http://localhost:9000/nexus-backend/wallet';
  connectedWallet: NexusWallet ={};
  constructor(private http: HttpClient,private metamskService: MetamaskService) {}


  createWallet(wallet: NexusWallet): Observable<NexusWallet> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.post<NexusWallet>(`${this.baseUrl}/create`, wallet,{ headers });
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

  getWalletByPublicKey(publicKey: String | null): Observable<NexusWallet> {
    return this.http.get<NexusWallet>(`${this.baseUrl}/findByPublicKey/${publicKey}`);
  }

  
}
