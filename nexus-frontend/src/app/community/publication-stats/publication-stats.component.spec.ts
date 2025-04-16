import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationStatsComponent } from './publication-stats.component';

describe('PublicationStatsComponent', () => {
  let component: PublicationStatsComponent;
  let fixture: ComponentFixture<PublicationStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicationStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicationStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
