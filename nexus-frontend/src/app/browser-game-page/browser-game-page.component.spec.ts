import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserGamePageComponent } from './browser-game-page.component';

describe('BrowserGamePageComponent', () => {
  let component: BrowserGamePageComponent;
  let fixture: ComponentFixture<BrowserGamePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowserGamePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowserGamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
