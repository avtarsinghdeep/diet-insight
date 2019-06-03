import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotOtpPage } from './forgot-otp.page';

describe('ForgotOtpPage', () => {
  let component: ForgotOtpPage;
  let fixture: ComponentFixture<ForgotOtpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotOtpPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotOtpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
