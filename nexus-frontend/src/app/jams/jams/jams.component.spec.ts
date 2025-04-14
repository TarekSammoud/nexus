import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JamsComponent } from './jams.component';

describe('JamsComponent', () => {
  let component: JamsComponent;
  let fixture: ComponentFixture<JamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
