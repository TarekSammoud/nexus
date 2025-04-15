import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryMediaFormComponent } from './entry-media-form.component';

describe('EntryMediaFormComponent', () => {
  let component: EntryMediaFormComponent;
  let fixture: ComponentFixture<EntryMediaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryMediaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntryMediaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
