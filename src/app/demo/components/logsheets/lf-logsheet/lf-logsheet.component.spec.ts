import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LfLogsheetComponent } from './lf-logsheet.component';

describe('LfLogsheetComponent', () => {
  let component: LfLogsheetComponent;
  let fixture: ComponentFixture<LfLogsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LfLogsheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LfLogsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
