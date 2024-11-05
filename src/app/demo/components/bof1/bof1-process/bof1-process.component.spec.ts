import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bof1ProcessComponent } from './bof1-process.component';

describe('Bof1ProcessComponent', () => {
  let component: Bof1ProcessComponent;
  let fixture: ComponentFixture<Bof1ProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bof1ProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bof1ProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
