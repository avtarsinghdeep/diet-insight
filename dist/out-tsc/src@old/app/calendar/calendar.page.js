var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Output, EventEmitter } from '@angular/core';
var CalendarPage = /** @class */ (function () {
    function CalendarPage() {
        this.dateEvent = new EventEmitter();
        this.month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        this.datecolor = null;
        this.box = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
        var m = new Date();
        this.selectedYear = m.getFullYear();
        this.selectedMonth = m.getMonth();
        // console.log(m.getMonth());
        this.calculate();
    }
    CalendarPage.prototype.pickDate = function (value) {
        if (value != null) {
            if (this.datecolor != null) {
                document.getElementById(this.datecolor).style.border = 'none';
                // document.getElementById(this.datecolor).style.color = "black";
                this.datecolor = null;
                this.pickDate(value);
            }
            if (this.datecolor == null) {
                this.datecolor = value + 'datediv';
                document.getElementById(this.datecolor).style.border = '1px solid #94c03e';
                // document.getElementById(this.datecolor).style.color = "white";
                this.dateEvent.emit(this.selectedYear + '-' + (this.selectedMonth + 1) + '-' + value);
                console.log(value + '-' + this.selectedMonth + '-' + this.selectedYear);
            }
        }
        else {
            if (this.datecolor != null) {
                document.getElementById(this.datecolor).style.border = 'none';
                // document.getElementById(this.datecolor).style.color = "black";
                this.datecolor = null;
                this.pickDate(value);
            }
        }
    };
    CalendarPage.prototype.calculate = function () {
        if ((this.selectedYear % 4 == 0 && this.selectedYear % 100 != 0) || this.selectedYear % 400 == 0) {
            this.leapornot = 'leap';
            this.totaldays = 366;
            if (this.selectedMonth + 1 == 1 || this.selectedMonth + 1 == 3 || this.selectedMonth + 1 == 5 || this.selectedMonth + 1 == 7 || this.selectedMonth + 1 == 8 || this.selectedMonth + 1 == 10 || this.selectedMonth + 1 == 12) {
                this.daysinmonth = 31;
            }
            if (this.selectedMonth + 1 == 2) {
                this.daysinmonth = 29;
            }
            if (this.selectedMonth + 1 == 4 || this.selectedMonth + 1 == 6 || this.selectedMonth + 1 == 9 || this.selectedMonth + 1 == 11) {
                this.daysinmonth = 30;
            }
        }
        else {
            this.leapornot = 'not leap';
            this.totaldays = 365;
            if (this.selectedMonth + 1 == 1 || this.selectedMonth + 1 == 3 || this.selectedMonth + 1 == 5 || this.selectedMonth + 1 == 7 || this.selectedMonth + 1 == 8 || this.selectedMonth + 1 == 10 || this.selectedMonth + 1 == 12) {
                this.daysinmonth = 31;
            }
            if (this.selectedMonth + 1 == 2) {
                this.daysinmonth = 28;
            }
            if (this.selectedMonth + 1 == 4 || this.selectedMonth + 1 == 6 || this.selectedMonth + 1 == 9 || this.selectedMonth + 1 == 11) {
                this.daysinmonth = 30;
            }
        }
        this.calculatedays();
        var z = 1;
        for (var i = 0; i < this.box.length; i++) {
            if (i >= this.monthfirstday) {
                if (z <= this.daysinmonth) {
                    this.box[i] = z;
                    z++;
                }
                else {
                    this.box[i] = null;
                }
            }
            else {
                this.box[i] = null;
            }
        }
    };
    CalendarPage.prototype.getDate = function () {
        return 'hello';
    };
    CalendarPage.prototype.previousMonth = function () {
        this.pickDate(null);
        this.dateEvent.emit(null);
        if (this.selectedMonth > 0) {
            this.selectedMonth = this.selectedMonth - 1;
        }
        else {
            this.selectedMonth = 11;
            this.selectedYear--;
        }
        this.calculate();
    };
    CalendarPage.prototype.nextMonth = function () {
        this.pickDate(null);
        this.dateEvent.emit(null);
        if (this.selectedMonth < 11) {
            this.selectedMonth = this.selectedMonth + 1;
        }
        else {
            this.selectedMonth = 0;
            this.selectedYear++;
        }
        this.calculate();
    };
    CalendarPage.prototype.calculatedays = function () {
        var d = 0;
        this.oddDays = this.selectedYear % 400;
        // console.log(this.oddDays)
        for (var i = this.oddDays; i > 0; i--) {
            if ((i % 4 == 0 && i % 100 != 0) || i % 400 == 0) {
                d = d + 2;
                // console.log('leap')
            }
            else {
                d = d + 1;
                // console.log('not leap')
            }
        }
        if (d > 7) {
            d = d % 7;
        }
        var a = this.odddaysinmonth();
        // console.log((a+d)%7)
        this.monthfirstday = (a + d) % 7;
    };
    CalendarPage.prototype.odddaysinmonth = function () {
        var d = 0;
        var m = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        for (var i = 0; i < this.selectedMonth; i) {
            d = d + m[i];
            i++;
        }
        if ((this.selectedYear % 4 == 0 && this.selectedYear % 100 != 0) || this.selectedYear % 400 == 0) {
            d = d + 1;
        }
        return d;
    };
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], CalendarPage.prototype, "dateEvent", void 0);
    CalendarPage = __decorate([
        Component({
            selector: 'app-calendar',
            templateUrl: './calendar.page.html',
            styleUrls: ['./calendar.page.scss'],
        }),
        __metadata("design:paramtypes", [])
    ], CalendarPage);
    return CalendarPage;
}());
export { CalendarPage };
//# sourceMappingURL=calendar.page.js.map