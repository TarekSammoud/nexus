import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Streamer } from '../../entities/community/streamer';

@Injectable({
  providedIn: 'root'
})
export class StreamerService {
  private apiUrl = 'http://localhost:9000/nexus-backend/api/streamers';

  constructor(private http: HttpClient) {}

  getAllStreamers(): Observable<Streamer[]> {
    return this.http.get<Streamer[]>(this.apiUrl);
  }

  getStreamerById(id: number): Observable<Streamer> {
    return this.http.get<Streamer>(`${this.apiUrl}/${id}`);
  }

  createStreamer(streamer: Streamer): Observable<Streamer> {
    return this.http.post<Streamer>(this.apiUrl, streamer);
  }

  updateStreamer(id: number, streamer: Streamer): Observable<Streamer> {
    return this.http.put<Streamer>(`${this.apiUrl}/${id}`, streamer);
  }

  deleteStreamer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
