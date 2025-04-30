import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseAdminComponent } from './purchase-admin.component';

describe('PurchaseAdminComponent', () => {
  let component: PurchaseAdminComponent;
  let fixture: ComponentFixture<PurchaseAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
