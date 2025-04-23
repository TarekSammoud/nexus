import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopStreamerComponent } from './top-streamer.component';

describe('TopStreamerComponent', () => {
  let component: TopStreamerComponent;
  let fixture: ComponentFixture<TopStreamerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopStreamerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopStreamerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
