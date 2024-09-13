import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinousCasterDialogComponent } from './continous-caster-dialog.component';

describe('ContinousCasterDialogComponent', () => {
  let component: ContinousCasterDialogComponent;
  let fixture: ComponentFixture<ContinousCasterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContinousCasterDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContinousCasterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
