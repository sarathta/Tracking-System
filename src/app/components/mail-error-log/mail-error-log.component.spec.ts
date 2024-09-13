import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailErrorLogComponent } from './mail-error-log.component';

describe('MailErrorLogComponent', () => {
  let component: MailErrorLogComponent;
  let fixture: ComponentFixture<MailErrorLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailErrorLogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailErrorLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
