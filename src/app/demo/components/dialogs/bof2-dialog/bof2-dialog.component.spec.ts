import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bof2DialogComponent } from './bof2-dialog.component';

describe('Bof2DialogComponent', () => {
  let component: Bof2DialogComponent;
  let fixture: ComponentFixture<Bof2DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bof2DialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bof2DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
