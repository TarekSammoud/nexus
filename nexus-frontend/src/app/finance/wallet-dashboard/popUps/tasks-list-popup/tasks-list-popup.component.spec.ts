import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksListPopupComponent } from './tasks-list-popup.component';

describe('TasksListPopupComponent', () => {
  let component: TasksListPopupComponent;
  let fixture: ComponentFixture<TasksListPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksListPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksListPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
