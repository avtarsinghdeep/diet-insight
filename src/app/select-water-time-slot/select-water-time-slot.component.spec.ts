import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectWaterTimeSlotComponent } from './select-water-time-slot.component';

describe('SelectWaterTimeSlotComponent', () => {
  let component: SelectWaterTimeSlotComponent;
  let fixture: ComponentFixture<SelectWaterTimeSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectWaterTimeSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectWaterTimeSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
