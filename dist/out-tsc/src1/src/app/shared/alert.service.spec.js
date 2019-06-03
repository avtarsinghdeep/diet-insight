import { TestBed } from '@angular/core/testing';
import { AlertService } from './alert.service';
describe('AlertService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(AlertService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=alert.service.spec.js.map