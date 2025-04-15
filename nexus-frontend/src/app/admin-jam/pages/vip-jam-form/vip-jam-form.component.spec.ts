import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VipJamFormComponent } from './vip-jam-form.component';

describe('VipJamFormComponent', () => {
  let component: VipJamFormComponent;
  let fixture: ComponentFixture<VipJamFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VipJamFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VipJamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
