import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VdLogsheetComponent } from './vd-logsheet.component';

describe('VdLogsheetComponent', () => {
  let component: VdLogsheetComponent;
  let fixture: ComponentFixture<VdLogsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VdLogsheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VdLogsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
