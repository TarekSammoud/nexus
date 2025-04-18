import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { NotificationService } from 'src/services/finance/notification.service';

@Component({
  selector: 'app-notification-banner',
  templateUrl: './notification-banner.component.html',
  styleUrls: ['./notification-banner.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px) scale(0.97)' }),
        animate('400ms cubic-bezier(.4,0,.2,1)', 
          style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
      ]),
      transition(':leave', [
        animate('400ms cubic-bezier(.4,0,.2,1)', 
          style({ opacity: 0, transform: 'translateY(40px) scale(0.97)' }))
      ])
    ])
  ]
})
export class NotificationBannerComponent {
  notification$ = this.notificationService.notification$;

  constructor(private notificationService: NotificationService) {}

  clear() {
    this.notificationService.clear();
  }

}
