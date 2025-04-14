import { TestBed } from '@angular/core/testing';

import { GameCategoryService } from './game-category.service';

describe('GameCategoryService', () => {
  let service: GameCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
