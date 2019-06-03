import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmealPage } from './addmeal.page';

describe('AddmealPage', () => {
  let component: AddmealPage;
  let fixture: ComponentFixture<AddmealPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmealPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmealPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
