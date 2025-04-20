import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface RefundAnalysisResponse {
  decision: string;
  justification: string;
}

@Injectable({
  providedIn: 'root'
})


export class GeminiService {

  private apiUrl = 'http://localhost:9000/nexus-backend/api/refund/analyze';

  constructor(private http: HttpClient) {}

  analyzeRefund(refundId: number): Observable<RefundAnalysisResponse> {
    // POST request, with no body
    return this.http.post<RefundAnalysisResponse>(`${this.apiUrl}/${refundId}`, {});
  }
}
