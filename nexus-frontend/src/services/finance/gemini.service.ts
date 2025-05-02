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

  private apiUrl = '/api/nexus-backend/api/refund/analyze';

  constructor(private http: HttpClient) {}

  analyzeRefund(refundId: number, email: string): Observable<RefundAnalysisResponse> {
    return this.http.post<RefundAnalysisResponse>(
      `${this.apiUrl}/${refundId}?email=${encodeURIComponent("hamdounisabri2@gmail.com")}`,
      {
}
    );
  }
}
