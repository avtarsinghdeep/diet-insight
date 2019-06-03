import { async, TestBed } from '@angular/core/testing';
import { MessageImagePopComponent } from './message-image-pop.component';
describe('MessageImagePopComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [MessageImagePopComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(MessageImagePopComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=message-image-pop.component.spec.js.map