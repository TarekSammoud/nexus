import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGameCategoryComponent } from './create-game-category.component';

describe('CreateGameCategoryComponent', () => {
  let component: CreateGameCategoryComponent;
  let fixture: ComponentFixture<CreateGameCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGameCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGameCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
