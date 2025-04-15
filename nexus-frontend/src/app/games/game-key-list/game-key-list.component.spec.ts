import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameKeyListComponent } from './game-key-list.component';

describe('GameKeyListComponent', () => {
  let component: GameKeyListComponent;
  let fixture: ComponentFixture<GameKeyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameKeyListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameKeyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
