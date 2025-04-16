import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestRefundComponent } from './request-refund.component';

describe('RequestRefundComponent', () => {
  let component: RequestRefundComponent;
  let fixture: ComponentFixture<RequestRefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestRefundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
