import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamerManagementComponent } from './streamer-management.component';

describe('StreamerManagementComponent', () => {
  let component: StreamerManagementComponent;
  let fixture: ComponentFixture<StreamerManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamerManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreamerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
