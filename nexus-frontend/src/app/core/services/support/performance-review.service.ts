import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { PerformanceReview } from '../../entities/support/PerformanceReview.model';

@Injectable({
  providedIn: 'root'
})
export class PerformanceReviewService {
  private baseUrl = '/api/nexus-backend/performancereviews';

  constructor(private http: HttpClient) {}

  // Initialized as BehaviorSubject
  displayState = new BehaviorSubject<boolean>(false);

  // Get all performance reviews
  getAllReviews(): Observable<PerformanceReview[]> {
    return this.http.get<PerformanceReview[]>(`${this.baseUrl}/getAll`);
  }

  // Get performance review by ID
  getReviewById(id: number): Observable<PerformanceReview> {
    return this.http.get<PerformanceReview>(`${this.baseUrl}/${id}`);
  }

  // Add a new performance review
  addReview(review: PerformanceReview): Observable<PerformanceReview> {
    return this.http.post<PerformanceReview>(`${this.baseUrl}/addReview`, review);
  }

  // Update an existing performance review
  updateReview(review: PerformanceReview): Observable<PerformanceReview> {
    return this.http.put<PerformanceReview>(`${this.baseUrl}/${review.id}`, review);
  }

  // Delete a performance review by ID
  deleteReview(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Returns an observable for the display state
  getPerformanceReviewDisplayState(): Observable<boolean> {
    return this.displayState.asObservable();
  }

  // Updates the display state to hide the performance review
  hidePerformanceReview(): void {
    this.displayState.next(false);
  }

  // Updates the display state to show the performance review
  showPerformanceReview(): void {
    this.displayState.next(true);
  }
}
