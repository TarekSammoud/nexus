import { TestBed } from '@angular/core/testing';

import { GameCategoryServiceService } from './game-category-service.service';

describe('GameCategoryServiceService', () => {
  let service: GameCategoryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameCategoryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
