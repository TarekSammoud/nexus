import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubCallbackComponent } from './github-callback.component';

describe('GithubCallbackComponent', () => {
  let component: GithubCallbackComponent;
  let fixture: ComponentFixture<GithubCallbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GithubCallbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GithubCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
