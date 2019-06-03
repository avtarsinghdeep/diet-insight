import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMealType1Component } from './select-meal-type1.component';

describe('SelectMealType1Component', () => {
  let component: SelectMealType1Component;
  let fixture: ComponentFixture<SelectMealType1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectMealType1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMealType1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
