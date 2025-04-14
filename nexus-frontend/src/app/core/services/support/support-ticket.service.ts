import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SupportTicket } from '../../entities/support/SupportTicket.model';

@Injectable({
  providedIn: 'root'
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
  
  // Method to update a ticket
  updateTicket(ticket: SupportTicket): Observable<SupportTicket> {
    return this.http.put<SupportTicket>(`${this.baseUrl}/${ticket.id}`, ticket);
  }

  // Method to delete a ticket
  deleteTicket(ticketId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${ticketId}`);
  }
  getTicketByRoomId(roomId: number): Observable<SupportTicket> {
    return this.http.get<SupportTicket>(`${this.baseUrl}/by-room/${roomId}`);
  }

  // Method to fetch tickets sorted by priority and creation date
  getTicketsSortedByPriorityAndCreatedAt(): Observable<SupportTicket[]> {
    return this.http.get<SupportTicket[]>(`${this.baseUrl}/sorted`);
  }
}
