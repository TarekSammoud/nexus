import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSubject = new BehaviorSubject<string | null>(null);

  get notification$(): Observable<string | null> {
    return this.notificationSubject.asObservable();
  }

  show(message: string, durationMs = 3000) {
    this.notificationSubject.next(message);
    setTimeout(() => this.clear(), durationMs);
  }

  clear() {
    this.notificationSubject.next(null);
  }
}
