import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReschedulePage } from './reschedule.page';

describe('ReschedulePage', () => {
  let component: ReschedulePage;
  let fixture: ComponentFixture<ReschedulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReschedulePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReschedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
