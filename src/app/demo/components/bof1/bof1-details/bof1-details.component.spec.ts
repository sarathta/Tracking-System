import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bof1DetailsComponent } from './bof1-details.component';

describe('Bof1DetailsComponent', () => {
  let component: Bof1DetailsComponent;
  let fixture: ComponentFixture<Bof1DetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bof1DetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bof1DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
