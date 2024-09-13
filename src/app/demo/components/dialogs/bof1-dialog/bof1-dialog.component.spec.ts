import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bof1DialogComponent } from './bof1-dialog.component';

describe('Bof1DialogComponent', () => {
  let component: Bof1DialogComponent;
  let fixture: ComponentFixture<Bof1DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bof1DialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bof1DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
