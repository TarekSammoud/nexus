import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private baseUrl = 'http://localhost:9000/nexus-backend/rooms';  // Update with your backend URL

  constructor(private http: HttpClient) {}

  // Create a new room for a ticket
  createRoom(ticketId: number): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/create/${ticketId}`, null)
      .pipe(catchError(this.handleError));
  }

  // Close a room for a ticket
  closeRoom(ticketId: number): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/close/${ticketId}`, null)
      .pipe(catchError(this.handleError));
  }

  // Get all rooms
  getAllRooms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getAll`)
      .pipe(catchError(this.handleError));
  }

  // Handle HTTP errors
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
