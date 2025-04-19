import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SondageLiveComponent } from './sondage-live.component';

describe('SondageLiveComponent', () => {
  let component: SondageLiveComponent;
  let fixture: ComponentFixture<SondageLiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SondageLiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SondageLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
