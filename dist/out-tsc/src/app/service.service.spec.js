import { TestBed } from '@angular/core/testing';
import { ServiceService } from './service.service';
describe('ServiceService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(ServiceService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=service.service.spec.js.map