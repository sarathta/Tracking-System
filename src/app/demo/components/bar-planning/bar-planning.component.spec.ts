import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarPlanningComponent } from './bar-planning.component';

describe('BarPlanningComponent', () => {
  let component: BarPlanningComponent;
  let fixture: ComponentFixture<BarPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarPlanningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
