import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJamDetailsComponent } from './admin-jam-details.component';

describe('AdminJamDetailsComponent', () => {
  let component: AdminJamDetailsComponent;
  let fixture: ComponentFixture<AdminJamDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminJamDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminJamDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
