import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LadleFurnaceProcessComponent } from './ladle-furnace-process.component';

describe('LadleFurnaceProcessComponent', () => {
  let component: LadleFurnaceProcessComponent;
  let fixture: ComponentFixture<LadleFurnaceProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LadleFurnaceProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LadleFurnaceProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
