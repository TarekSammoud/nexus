import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendRequestActionsComponent } from './friend-request-actions.component';

describe('FriendRequestActionsComponent', () => {
  let component: FriendRequestActionsComponent;
  let fixture: ComponentFixture<FriendRequestActionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FriendRequestActionsComponent]
    });
    fixture = TestBed.createComponent(FriendRequestActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
