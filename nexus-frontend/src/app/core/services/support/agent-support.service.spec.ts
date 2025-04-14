import { TestBed } from '@angular/core/testing';

import { AgentSupportService } from './agent-support.service';

describe('AgentSupportService', () => {
  let service: AgentSupportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentSupportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
