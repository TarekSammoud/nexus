import { TestBed } from '@angular/core/testing';

import { SupportAgentService } from './support-agent.service';

describe('SupportAgentService', () => {
  let service: SupportAgentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupportAgentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
