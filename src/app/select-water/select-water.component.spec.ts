import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectWaterComponent } from './select-water.component';

describe('SelectWaterComponent', () => {
  let component: SelectWaterComponent;
  let fixture: ComponentFixture<SelectWaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectWaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectWaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
