import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSupportListComponent } from './admin-support-list.component';

describe('AdminSupportListComponent', () => {
  let component: AdminSupportListComponent;
  let fixture: ComponentFixture<AdminSupportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSupportListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSupportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
