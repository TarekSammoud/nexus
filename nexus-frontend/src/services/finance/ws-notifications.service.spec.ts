import { TestBed } from '@angular/core/testing';

import { WsNotificationsService } from './ws-notifications.service';

describe('WsNotificationsService', () => {
  let service: WsNotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WsNotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
