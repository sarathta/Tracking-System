import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcmLogsheetComponent } from './ccm-logsheet.component';

describe('CcmLogsheetComponent', () => {
  let component: CcmLogsheetComponent;
  let fixture: ComponentFixture<CcmLogsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcmLogsheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CcmLogsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
