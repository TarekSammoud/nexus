import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesCarouselComponent } from './games-carousel.component';

describe('GamesCarouselComponent', () => {
  let component: GamesCarouselComponent;
  let fixture: ComponentFixture<GamesCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamesCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
