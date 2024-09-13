import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccumDegassingDialogComponent } from './vaccum-degassing-dialog.component';

describe('VaccumDegassingDialogComponent', () => {
  let component: VaccumDegassingDialogComponent;
  let fixture: ComponentFixture<VaccumDegassingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccumDegassingDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaccumDegassingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
