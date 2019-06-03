import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStateComponent } from './select-state.component';

describe('SelectStateComponent', () => {
  let component: SelectStateComponent;
  let fixture: ComponentFixture<SelectStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
