import { Observable } from "rxjs";
import { SupportTicket } from "../../entities/support/SupportTicket.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  private baseUrl = 'http://localhost:9000/nexus-backend/tickets';

  constructor(private http: HttpClient) {}

  getAllTickets(): Observable<SupportTicket[]> {
    return this.http.get<SupportTicket[]>(`${this.baseUrl}/getAll`);
  }

  createTicket(userId: number, ticket: SupportTicket): Observable<SupportTicket> {
    return this.http.post<SupportTicket>(`${this.baseUrl}/createticket/${userId}`, ticket);
  }

  updateTicket(ticket: SupportTicket): Observable<SupportTicket> {
    return this.http.put<SupportTicket>(`${this.baseUrl}/${ticket.id}`, ticket);
  }

  deleteTicket(ticketId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${ticketId}`);
  }

  getTicketByRoomId(roomId: number): Observable<SupportTicket> {
    return this.http.get<SupportTicket>(`${this.baseUrl}/by-room/${roomId}`);
  }

  getTicketsSortedByPriorityAndCreatedAt(): Observable<SupportTicket[]> {
    return this.http.get<SupportTicket[]>(`${this.baseUrl}/sorted`);
  }
}
