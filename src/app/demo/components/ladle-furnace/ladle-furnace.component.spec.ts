import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LadleFurnaceComponent } from './ladle-furnace.component';

describe('LadleFurnaceComponent', () => {
  let component: LadleFurnaceComponent;
  let fixture: ComponentFixture<LadleFurnaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LadleFurnaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LadleFurnaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
