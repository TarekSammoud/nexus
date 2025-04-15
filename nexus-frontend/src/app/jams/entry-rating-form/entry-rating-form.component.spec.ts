import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryRatingFormComponent } from './entry-rating-form.component';

describe('EntryRatingFormComponent', () => {
  let component: EntryRatingFormComponent;
  let fixture: ComponentFixture<EntryRatingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryRatingFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntryRatingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
