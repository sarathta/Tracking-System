import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bof2ProcessComponent } from './bof2-process.component';

describe('Bof2ProcessComponent', () => {
  let component: Bof2ProcessComponent;
  let fixture: ComponentFixture<Bof2ProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bof2ProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bof2ProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
