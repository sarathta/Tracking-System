import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bof1LogsheetComponent } from './bof1-logsheet.component';

describe('Bof1LogsheetComponent', () => {
  let component: Bof1LogsheetComponent;
  let fixture: ComponentFixture<Bof1LogsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bof1LogsheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bof1LogsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
