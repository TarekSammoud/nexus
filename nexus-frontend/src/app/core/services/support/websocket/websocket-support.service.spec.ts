import { TestBed } from '@angular/core/testing';

import { WebsocketSupportService } from './websocket-support.service';

describe('WebsocketSupportService', () => {
  let service: WebsocketSupportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsocketSupportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
