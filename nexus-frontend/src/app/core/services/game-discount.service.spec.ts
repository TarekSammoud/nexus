import { TestBed } from '@angular/core/testing';

import { GameDiscountService } from './game-discount.service';

describe('GameDiscountService', () => {
  let service: GameDiscountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameDiscountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
