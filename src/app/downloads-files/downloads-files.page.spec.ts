import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadsFilesPage } from './downloads-files.page';

describe('DownloadsFilesPage', () => {
  let component: DownloadsFilesPage;
  let fixture: ComponentFixture<DownloadsFilesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadsFilesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadsFilesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
