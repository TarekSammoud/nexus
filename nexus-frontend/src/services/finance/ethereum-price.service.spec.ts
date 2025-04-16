import { TestBed } from '@angular/core/testing';

import { EthereumPriceService } from './ethereum-price.service';

describe('EthereumPriceService', () => {
  let service: EthereumPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EthereumPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
