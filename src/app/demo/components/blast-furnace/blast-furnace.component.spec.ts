import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlastFurnaceComponent } from './blast-furnace.component';

describe('BlastFurnaceComponent', () => {
  let component: BlastFurnaceComponent;
  let fixture: ComponentFixture<BlastFurnaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlastFurnaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlastFurnaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
