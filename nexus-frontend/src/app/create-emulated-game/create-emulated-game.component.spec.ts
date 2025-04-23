import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmulatedGameComponent } from './create-emulated-game.component';

describe('CreateEmulatedGameComponent', () => {
  let component: CreateEmulatedGameComponent;
  let fixture: ComponentFixture<CreateEmulatedGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEmulatedGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEmulatedGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
