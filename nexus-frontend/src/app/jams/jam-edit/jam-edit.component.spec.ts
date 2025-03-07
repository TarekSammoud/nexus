import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JamEditComponent } from './jam-edit.component';

describe('JamEditComponent', () => {
  let component: JamEditComponent;
  let fixture: ComponentFixture<JamEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JamEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JamEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
