import { async, TestBed } from '@angular/core/testing';
import { SelectWaterTimeSlotComponent } from './select-water-time-slot.component';
describe('SelectWaterTimeSlotComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [SelectWaterTimeSlotComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(SelectWaterTimeSlotComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=select-water-time-slot.component.spec.js.map