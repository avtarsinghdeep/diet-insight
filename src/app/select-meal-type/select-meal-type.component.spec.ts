import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMealTypeComponent } from './select-meal-type.component';

describe('SelectMealTypeComponent', () => {
  let component: SelectMealTypeComponent;
  let fixture: ComponentFixture<SelectMealTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectMealTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMealTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
