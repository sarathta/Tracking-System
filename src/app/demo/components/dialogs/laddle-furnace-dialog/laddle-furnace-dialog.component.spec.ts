import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaddleFurnaceDialogComponent } from './laddle-furnace-dialog.component';

describe('LaddleFurnaceDialogComponent', () => {
  let component: LaddleFurnaceDialogComponent;
  let fixture: ComponentFixture<LaddleFurnaceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaddleFurnaceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaddleFurnaceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
