import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCategoriesComponent } from './game-categories.component';

describe('GameCategoriesComponent', () => {
  let component: GameCategoriesComponent;
  let fixture: ComponentFixture<GameCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
