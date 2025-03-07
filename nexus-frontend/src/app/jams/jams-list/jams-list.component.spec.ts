import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JamsListComponent } from './jams-list.component';

describe('JamsListComponent', () => {
  let component: JamsListComponent;
  let fixture: ComponentFixture<JamsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JamsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JamsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
