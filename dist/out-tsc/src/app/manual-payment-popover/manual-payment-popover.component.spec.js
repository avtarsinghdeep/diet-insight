import { async, TestBed } from '@angular/core/testing';
import { ManualPaymentPopoverComponent } from './manual-payment-popover.component';
describe('ManualPaymentPopoverComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ManualPaymentPopoverComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ManualPaymentPopoverComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=manual-payment-popover.component.spec.js.map