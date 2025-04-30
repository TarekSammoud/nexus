import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JamCalendarComponent } from './jam-calendar.component';

describe('JamCalendarComponent', () => {
  let component: JamCalendarComponent;
  let fixture: ComponentFixture<JamCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JamCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JamCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
