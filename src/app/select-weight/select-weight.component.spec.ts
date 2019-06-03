import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectWeightComponent } from './select-weight.component';

describe('SelectWeightComponent', () => {
  let component: SelectWeightComponent;
  let fixture: ComponentFixture<SelectWeightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectWeightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
