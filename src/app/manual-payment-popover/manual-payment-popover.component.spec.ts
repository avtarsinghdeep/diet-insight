import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualPaymentPopoverComponent } from './manual-payment-popover.component';

describe('ManualPaymentPopoverComponent', () => {
  let component: ManualPaymentPopoverComponent;
  let fixture: ComponentFixture<ManualPaymentPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualPaymentPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualPaymentPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
