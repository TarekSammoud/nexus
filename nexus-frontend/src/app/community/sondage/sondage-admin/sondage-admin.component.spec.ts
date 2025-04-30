import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SondageAdminComponent } from './sondage-admin.component';

describe('SondageAdminComponent', () => {
  let component: SondageAdminComponent;
  let fixture: ComponentFixture<SondageAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SondageAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SondageAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
