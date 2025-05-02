import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface VipJam {
  id?: number;
  name: string;
  description: string;
  devStartDate: string;
  devEndDate: string;
  reward?: string;
  primaryColor?: string;
  font?: string;
  bannerType?: string;
  moodClass?: string;
}

@Injectable({
  providedIn: 'root'
})
export class VipJamService {
  private baseUrl = '/api/nexus-backend/api/vip-jams';

  constructor(private http: HttpClient) {}

  createVipJam(vipJam: VipJam): Observable<VipJam> {
    return this.http.post<VipJam>(`${this.baseUrl}/create`, vipJam);
  }

  getAllVipJams(): Observable<VipJam[]> {
    return this.http.get<VipJam[]>(`${this.baseUrl}/all`);
  }
  
  updateVipJam(id: number, vipJam: VipJam): Observable<VipJam> {
    return this.http.put<VipJam>(`${this.baseUrl}/update/${id}`, vipJam);
  }
  
  deleteVipJam(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
  
}
