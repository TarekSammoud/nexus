import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EthereumPriceService {
  private apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';


  constructor(private http: HttpClient) {}

  getEthereumPrice(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

}
