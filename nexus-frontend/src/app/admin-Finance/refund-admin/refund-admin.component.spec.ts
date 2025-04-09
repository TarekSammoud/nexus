import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundAdminComponent } from './refund-admin.component';

describe('RefundAdminComponent', () => {
  let component: RefundAdminComponent;
  let fixture: ComponentFixture<RefundAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefundAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefundAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
