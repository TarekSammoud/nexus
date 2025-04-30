import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveRoomComponent } from './live-room.component';

describe('LiveRoomComponent', () => {
  let component: LiveRoomComponent;
  let fixture: ComponentFixture<LiveRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
