import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bof2Component } from './bof2.component';

describe('Bof2Component', () => {
  let component: Bof2Component;
  let fixture: ComponentFixture<Bof2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bof2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bof2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
