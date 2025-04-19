import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJamEditComponent } from './admin-jam-edit.component';

describe('AdminJamEditComponent', () => {
  let component: AdminJamEditComponent;
  let fixture: ComponentFixture<AdminJamEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminJamEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminJamEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
