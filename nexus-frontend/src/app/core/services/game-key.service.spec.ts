import { TestBed } from '@angular/core/testing';

import { GameKeyService } from './game-key.service';

describe('GameKeyService', () => {
  let service: GameKeyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameKeyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
