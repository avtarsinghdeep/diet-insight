import { async, TestBed } from '@angular/core/testing';
import { PackageUpgradeComponent } from './package-upgrade.component';
describe('PackageUpgradeComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [PackageUpgradeComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(PackageUpgradeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=package-upgrade.component.spec.js.map