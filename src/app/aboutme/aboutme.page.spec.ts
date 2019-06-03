import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutmePage } from './aboutme.page';

describe('AboutmePage', () => {
  let component: AboutmePage;
  let fixture: ComponentFixture<AboutmePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutmePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutmePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
