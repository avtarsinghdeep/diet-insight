import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalProfile2Page } from './medical-profile2.page';

describe('MedicalProfile2Page', () => {
  let component: MedicalProfile2Page;
  let fixture: ComponentFixture<MedicalProfile2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalProfile2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalProfile2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
