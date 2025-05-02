import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Entry } from '../../entities/Jam/entry';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  private baseUrl = '/api/nexus-backend/api/entries';

  constructor(private http: HttpClient) {}

  getAllEntries(): Observable<Entry[]> {
    return this.http.get<Entry[]>(`${this.baseUrl}/all`);
  }

  getEntryById(id: number): Observable<Entry> {
    return this.http.get<Entry>(`${this.baseUrl}/${id}`);
  }

  createEntry(entry: Entry): Observable<Entry> {
    return this.http.post<Entry>(`${this.baseUrl}/add`, entry);
  }

  updateEntry(entry: Entry): Observable<Entry> {
    return this.http.put<Entry>(`${this.baseUrl}/update`, entry);
  }

  deleteEntry(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  getEntriesByUser(userId: number): Observable<Entry[]> {
    return this.http.get<Entry[]>(`${this.baseUrl}/user/${userId}`);
  }

  getEntriesByJam(jamId: number): Observable<Entry[]> {
    return this.http.get<Entry[]>(`${this.baseUrl}/jam/${jamId}`);
  }
  
  
}
