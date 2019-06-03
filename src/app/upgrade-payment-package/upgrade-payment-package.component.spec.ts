import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradePaymentPackageComponent } from './upgrade-payment-package.component';

describe('UpgradePaymentPackageComponent', () => {
  let component: UpgradePaymentPackageComponent;
  let fixture: ComponentFixture<UpgradePaymentPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpgradePaymentPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradePaymentPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
