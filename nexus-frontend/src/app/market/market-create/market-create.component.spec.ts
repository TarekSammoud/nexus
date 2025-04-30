import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketCreateComponent } from './market-create.component';

describe('MarketCreateComponent', () => {
  let component: MarketCreateComponent;
  let fixture: ComponentFixture<MarketCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
