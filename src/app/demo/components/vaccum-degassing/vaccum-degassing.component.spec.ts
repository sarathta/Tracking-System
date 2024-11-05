import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccumDegassingComponent } from './vaccum-degassing.component';

describe('VaccumDegassingComponent', () => {
  let component: VaccumDegassingComponent;
  let fixture: ComponentFixture<VaccumDegassingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccumDegassingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaccumDegassingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
