import { async, TestBed } from '@angular/core/testing';
import { UpgradePaymentPackageComponent } from './upgrade-payment-package.component';
describe('UpgradePaymentPackageComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [UpgradePaymentPackageComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(UpgradePaymentPackageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=upgrade-payment-package.component.spec.js.map