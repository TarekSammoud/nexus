import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPerformanceReviewComponent } from './admin-performance-review.component';

describe('AdminPerformanceReviewComponent', () => {
  let component: AdminPerformanceReviewComponent;
  let fixture: ComponentFixture<AdminPerformanceReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPerformanceReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPerformanceReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
