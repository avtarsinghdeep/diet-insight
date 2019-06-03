import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MydietplanPage } from './mydietplan.page';

describe('MydietplanPage', () => {
  let component: MydietplanPage;
  let fixture: ComponentFixture<MydietplanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MydietplanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MydietplanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
