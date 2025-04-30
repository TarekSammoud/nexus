import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeenGameCarouselComponent } from './keen-game-carousel.component';

describe('KeenGameCarouselComponent', () => {
  let component: KeenGameCarouselComponent;
  let fixture: ComponentFixture<KeenGameCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeenGameCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeenGameCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
