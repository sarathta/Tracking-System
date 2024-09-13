import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollingMillComponent } from './rolling-mill.component';

describe('RollingMillComponent', () => {
  let component: RollingMillComponent;
  let fixture: ComponentFixture<RollingMillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RollingMillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RollingMillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
