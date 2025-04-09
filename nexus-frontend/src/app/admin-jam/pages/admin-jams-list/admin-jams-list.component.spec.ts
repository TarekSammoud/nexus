import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJamsListComponent } from './admin-jams-list.component';

describe('AdminJamsListComponent', () => {
  let component: AdminJamsListComponent;
  let fixture: ComponentFixture<AdminJamsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminJamsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminJamsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
