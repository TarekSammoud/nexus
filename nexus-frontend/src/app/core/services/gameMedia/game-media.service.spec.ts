import { TestBed } from '@angular/core/testing';

import { GameMediaService } from './game-media.service';

describe('GameMediaService', () => {
  let service: GameMediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameMediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
