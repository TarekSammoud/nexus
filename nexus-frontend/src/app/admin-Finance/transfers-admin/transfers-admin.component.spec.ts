import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfersAdminComponent } from './transfers-admin.component';

describe('TransfersAdminComponent', () => {
  let component: TransfersAdminComponent;
  let fixture: ComponentFixture<TransfersAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransfersAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransfersAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
