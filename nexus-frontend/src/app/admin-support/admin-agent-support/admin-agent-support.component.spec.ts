import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAgentSupportComponent } from './admin-agent-support.component';

describe('AdminAgentSupportComponent', () => {
  let component: AdminAgentSupportComponent;
  let fixture: ComponentFixture<AdminAgentSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAgentSupportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAgentSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
