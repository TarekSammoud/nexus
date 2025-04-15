import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VipJamsListComponent } from './vip-jams-list.component';

describe('VipJamsListComponent', () => {
  let component: VipJamsListComponent;
  let fixture: ComponentFixture<VipJamsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VipJamsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VipJamsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
