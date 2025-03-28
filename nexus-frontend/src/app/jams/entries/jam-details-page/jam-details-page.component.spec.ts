import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JamDetailsPageComponent } from './jam-details-page.component';

describe('JamDetailsPageComponent', () => {
  let component: JamDetailsPageComponent;
  let fixture: ComponentFixture<JamDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JamDetailsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JamDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
