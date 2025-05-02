import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private baseUrl = '/api/nexus-backend/rooms';  // Update with your backend URL

  constructor(private http: HttpClient) {}

  // Create a new room for a ticket
  createRoom(ticketId: number): Observable<string> {
    const url = `${this.baseUrl}/create/${ticketId}`;
    return this.http.post<string>(url, null).pipe(catchError(this.handleError));
  }
  

  // Close a room for a ticket
  closeRoom(roomId: number): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/close/${roomId}`, null)
      .pipe(catchError(this.handleError));
  }

  // Get all rooms
  getAllRooms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getAll`)
      .pipe(catchError(this.handleError));
  }

  // Send a message to a room
  sendMessage(roomId: number, sender: string, content: string): Observable<any> {
    const url = `${this.baseUrl}/sendMessage/${roomId}`;
    const params = {
      sender: sender,
      content: content
    };
    
    return this.http.post(url, null, { params })
      .pipe(catchError(this.handleError));
  }

  // Delete a room
  deleteRoom(roomId: number): Observable<string> {
    const url = `${this.baseUrl}/delete/${roomId}`;
    return this.http.delete<string>(url)
      .pipe(catchError(this.handleError));
  }

  // Receive messages for a room
  receiveMessages(roomId: number): Observable<any> {
    const url = `${this.baseUrl}/messages/${roomId}`;
    return this.http.get<any>(url)
      .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`;
    }
    return throwError(errorMessage);
  }
}
