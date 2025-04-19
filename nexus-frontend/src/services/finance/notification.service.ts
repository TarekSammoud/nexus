import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WsNotificationsService } from './ws-notifications.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private wsNotificationsService: WsNotificationsService) {}
  private notificationSubject = new BehaviorSubject<string | null>(null);

  get notification$(): Observable<string | null> {
    return this.notificationSubject.asObservable();
  }

  show(message: string, durationMs = 3000) {
    this.notificationSubject.next(message);
    setTimeout(() => this.clear(), durationMs);
  }

  showNotification(userId:string,messageTOsend: string) {
    const message = { userId: userId, message: messageTOsend };
    this.wsNotificationsService.sendMessage('/app/send-notification', message); 
  }

  clear() {
    this.notificationSubject.next(null);
  }
}
