import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBrowserGameComponent } from './create-browser-game.component';

describe('CreateBrowserGameComponent', () => {
  let component: CreateBrowserGameComponent;
  let fixture: ComponentFixture<CreateBrowserGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBrowserGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBrowserGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
