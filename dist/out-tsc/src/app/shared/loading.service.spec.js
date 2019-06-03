import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';
describe('LoadingService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(LoadingService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=loading.service.spec.js.map