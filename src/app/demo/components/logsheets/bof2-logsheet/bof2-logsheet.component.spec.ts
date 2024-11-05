import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bof2LogsheetComponent } from './bof2-logsheet.component';

describe('Bof2LogsheetComponent', () => {
  let component: Bof2LogsheetComponent;
  let fixture: ComponentFixture<Bof2LogsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bof2LogsheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bof2LogsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
