import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameGridComponent } from './game-grid.component';

describe('GameGridComponent', () => {
  let component: GameGridComponent;
  let fixture: ComponentFixture<GameGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
