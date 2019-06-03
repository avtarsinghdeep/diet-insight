import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalProfilePage } from './personal-profile.page';

describe('PersonalProfilePage', () => {
  let component: PersonalProfilePage;
  let fixture: ComponentFixture<PersonalProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
