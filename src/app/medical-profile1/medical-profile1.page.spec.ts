import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalProfile1Page } from './medical-profile1.page';

describe('MedicalProfile1Page', () => {
  let component: MedicalProfile1Page;
  let fixture: ComponentFixture<MedicalProfile1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalProfile1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalProfile1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
