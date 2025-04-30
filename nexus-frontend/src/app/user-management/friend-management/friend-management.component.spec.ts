import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendManagementComponent } from './friend-management.component';

describe('FriendManagementComponent', () => {
  let component: FriendManagementComponent;
  let fixture: ComponentFixture<FriendManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FriendManagementComponent]
    });
    fixture = TestBed.createComponent(FriendManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
