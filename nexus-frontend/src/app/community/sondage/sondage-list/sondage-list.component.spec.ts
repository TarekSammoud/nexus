import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SondageListComponent } from './sondage-list.component';

describe('SondageListComponent', () => {
  let component: SondageListComponent;
  let fixture: ComponentFixture<SondageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SondageListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SondageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
