import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTestimonialsPage } from './add-testimonials.page';

describe('AddTestimonialsPage', () => {
  let component: AddTestimonialsPage;
  let fixture: ComponentFixture<AddTestimonialsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTestimonialsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTestimonialsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
