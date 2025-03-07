import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JamFormComponent } from './jam-form.component';

describe('JamFormComponent', () => {
  let component: JamFormComponent;
  let fixture: ComponentFixture<JamFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JamFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
