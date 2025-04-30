import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JamDetailsComponent } from './jam-details.component';

describe('JamDetailsComponent', () => {
  let component: JamDetailsComponent;
  let fixture: ComponentFixture<JamDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JamDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JamDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
