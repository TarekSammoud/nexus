import { TestBed } from '@angular/core/testing';

import { SpamCheckService } from './spam-check.service';

describe('SpamCheckService', () => {
  let service: SpamCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpamCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
