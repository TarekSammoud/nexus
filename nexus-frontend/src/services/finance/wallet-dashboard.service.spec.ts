import { TestBed } from '@angular/core/testing';

import { WalletDashboardService } from './wallet-dashboard.service';

describe('WalletDashboardService', () => {
  let service: WalletDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalletDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
