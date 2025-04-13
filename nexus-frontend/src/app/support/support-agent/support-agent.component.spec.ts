import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportAgentComponent } from './support-agent.component';

describe('SupportAgentComponent', () => {
  let component: SupportAgentComponent;
  let fixture: ComponentFixture<SupportAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportAgentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
