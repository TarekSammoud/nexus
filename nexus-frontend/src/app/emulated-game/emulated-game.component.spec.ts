import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmulatedGameComponent } from './emulated-game.component';

describe('EmulatedGameComponent', () => {
  let component: EmulatedGameComponent;
  let fixture: ComponentFixture<EmulatedGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmulatedGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmulatedGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
