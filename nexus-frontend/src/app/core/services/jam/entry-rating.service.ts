import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntryRating } from '../../entities/Jam/entry-rating';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EntryRatingService {
  private baseUrl = '/api/nexus-backend/api/entry-ratings';

  constructor(private http: HttpClient) {}

  getAllRatings(): Observable<EntryRating[]> {
    return this.http.get<EntryRating[]>(`${this.baseUrl}/all`);
  }

  getRatingById(id: number): Observable<EntryRating> {
    return this.http.get<EntryRating>(`${this.baseUrl}/${id}`);
  }

  createRating(rating: EntryRating): Observable<EntryRating> {
    return this.http.post<EntryRating>(`${this.baseUrl}/add`, rating);
  }

  updateRating(rating: EntryRating): Observable<EntryRating> {
    return this.http.put<EntryRating>(`${this.baseUrl}/update`, rating);
  }

  deleteRating(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  getRatingsByEntry(entryId: number): Observable<EntryRating[]> {
    return this.http.get<EntryRating[]>(`${this.baseUrl}/entry/${entryId}`);
  }

hasUserRated(entryId: number, userId: number): Observable<boolean> {
  return this.http.get<boolean>(`/api/nexus-backend/api/entry-ratings/has-rated/${entryId}/${userId}`);
}

  
}
