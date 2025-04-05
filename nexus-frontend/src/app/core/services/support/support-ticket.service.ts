import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SupportTicket } from '../../entities/support/SupportTicket.model';

@Injectable({
  providedIn: 'root',
})
export class SupportService {
  private baseUrl = 'http://localhost:9000/nexus-backend/tickets';

  // 👇 This is what was missing
  constructor(private http: HttpClient) {}

  getAllTickets(): Observable<SupportTicket[]> {
    return this.http.get<SupportTicket[]>(`${this.baseUrl}/getAll`);
  }

  createTicket(ticket: SupportTicket): Observable<SupportTicket> {
    return this.http.post<SupportTicket>(`${this.baseUrl}/createticket`, ticket);
  }
}
