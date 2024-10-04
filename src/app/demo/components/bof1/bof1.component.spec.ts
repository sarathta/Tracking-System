import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bof1Component } from './bof1.component';

describe('Bof1Component', () => {
  let component: Bof1Component;
  let fixture: ComponentFixture<Bof1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bof1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bof1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
