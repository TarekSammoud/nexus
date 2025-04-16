import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SondageCreateComponent } from './sondage-create.component';

describe('SondageCreateComponent', () => {
  let component: SondageCreateComponent;
  let fixture: ComponentFixture<SondageCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SondageCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SondageCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
