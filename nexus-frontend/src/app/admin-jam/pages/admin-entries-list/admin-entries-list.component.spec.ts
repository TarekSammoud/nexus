import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEntriesListComponent } from './admin-entries-list.component';

describe('AdminEntriesListComponent', () => {
  let component: AdminEntriesListComponent;
  let fixture: ComponentFixture<AdminEntriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEntriesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEntriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
