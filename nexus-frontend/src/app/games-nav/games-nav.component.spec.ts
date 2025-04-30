import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesNavComponent } from './games-nav.component';

describe('GamesNavComponent', () => {
  let component: GamesNavComponent;
  let fixture: ComponentFixture<GamesNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamesNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
