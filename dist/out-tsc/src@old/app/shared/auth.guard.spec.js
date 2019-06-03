import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';
describe('AuthGuard', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [AuthGuard]
        });
    });
    it('should ...', inject([AuthGuard], function (guard) {
        expect(guard).toBeTruthy();
    }));
});
//# sourceMappingURL=auth.guard.spec.js.map