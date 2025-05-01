import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntryMedia } from '../../entities/Jam/entry-media';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EntryMediaService {
  private baseUrl = 'http://nexus-backend.backend.svc.cluster.local:9000/nexus-backend/api/entry-media';

  constructor(private http: HttpClient) {}

  getAllMedia(): Observable<EntryMedia[]> {
    return this.http.get<EntryMedia[]>(`${this.baseUrl}/all`);
  }

  getMediaById(id: number): Observable<EntryMedia> {
    return this.http.get<EntryMedia>(`${this.baseUrl}/${id}`);
  }

  getMediaByEntry(entryId: number): Observable<EntryMedia[]> {
    return this.http.get<EntryMedia[]>(`${this.baseUrl}/entry/${entryId}`);
  }

  createMedia(media: EntryMedia): Observable<EntryMedia> {
    return this.http.post<EntryMedia>(`${this.baseUrl}/add`, media);
  }

  updateMedia(media: EntryMedia): Observable<EntryMedia> {
    return this.http.put<EntryMedia>(`${this.baseUrl}/update`, media);
  }

  deleteMedia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
