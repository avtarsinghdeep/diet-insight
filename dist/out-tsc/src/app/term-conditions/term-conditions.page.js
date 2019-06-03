var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavController, MenuController, IonContent } from '@ionic/angular';
import { DataService } from '../shared/index';
var TermConditionsPage = /** @class */ (function () {
    function TermConditionsPage(navController, dataService, menuController) {
        this.navController = navController;
        this.dataService = dataService;
        this.menuController = menuController;
        this.selected = false;
        this.terms = [{
                condition: "You are consulting with a Dietitian. The information obtained during your session(s) with our dietitian, cannot replace or substitute for the services of your physician/doctor. "
            },
            {
                condition: "This is healthcare and not a business. The money you pay is for our time, something we treat as a precious commodity. The time we invest is irreversible, hence we choose to make the most of it in our relationship with you to understand your ailments and to heal you."
            },
            {
                condition: "While we value your money, we do not want it if it's going to be used in a way to threaten us and our work or seal your place of power in the relationship. We value and respect who you are and what you may do, but we are not concerned about your designation or your place in society. Everyone is equal in our eyes, so we thank you in advance for refraining from name dropping and exerting influence."
            },
            {
                condition: "We will not tolerate a poor attitude and lack of respect as it becomes a seriously limiting factor in your healing and our relationship. We respect you and value you and we have the same expectations of you, so we can do what we do best. Please consider this point seriously before you decide to join."
            },
            {
                condition: "Some ailments take longer to heal. Illness and weight problems develop over the years and it is unrealistic to expect a miracle in 1 week or 1 month. We do not work with symptoms, we address root causes to try and cure and heal you and that takes time. Be patient and you will reap its benefits."
            },
            {
                condition: "Our relationship is based on coaching, educating and truly being there for you. Ask questions, seek logic, as much as you need to. Please do not resort to unnecessary challenging and keep your ego in check. These behaviours are severely draining and will not help us meet our objective."
            },
            {
                condition: "We do not force you to take any supplements, although we may make suggestions and recommendations based on what we feel is what you need and best for you."
            },
            {
                condition: "You commit to strictly follow this program for the period as directed without cheating."
            },
            {
                condition: "You commit to take responsibility for your own actions and understand that the dietitian cannot control what you consume."
            },
            {
                condition: "<b>Payments:</b> You agree to make full payment at the start of the program."
            },
            {
                condition: "<b>We do not guarantee 5, 10 or 15 kilo weight loss programs.</b> We believe the human body can safely lose up to 2-3 kilos a month and we prefer to do it the right way, the holistic way and in a way that is safe for your body and in a way where the weight you lose will stay off and not bounce back once you get off the program."
            },
            {
                condition: "<b>Upgrades:</b> A program once enrolled in, can ONLY be upgraded within the first week from the start date. Downgrades are not allowed."
            },
            {
                condition: "<b>Transfers:</b> If, for a medical or other emergent reason, you are not able to continue the program, you can transfer it to a friend or a family member at the cost of consultation fee. No multiple transfers."
            },
            {
                condition: "<b>Breaks:</b> You can put your program on hold at any time and continue later at any time, provided you notify us prior to your scheduled appointments."
            },
            {
                condition: "<b>Missed appointments: </b>If you miss your appointment and do not notify us, it is your responsibility to reach out to us and reschedule your next appointment."
            },
            {
                condition: "<b>Refunds:</b> Once you have paid for a program, the No Refund policy applies. Due to the nature of services involved, no refund is provided, under any circumstances."
            }
        ];
        if (this.dataService.pageType == "sidemenu") {
            this.menuController.enable(true, 'first');
        }
        else {
            this.menuController.enable(false, 'first');
        }
    }
    TermConditionsPage.prototype.ngOnInit = function () {
        // console.log(this.dataService.data);
    };
    TermConditionsPage.prototype.submit = function () {
        this.navController.navigateForward('cart');
    };
    TermConditionsPage.prototype.info = function () {
        this.navController.navigateForward('help');
    };
    TermConditionsPage.prototype.onDropDown = function () {
        this.content.scrollToBottom(100);
    };
    __decorate([
        ViewChild(IonContent),
        __metadata("design:type", IonContent)
    ], TermConditionsPage.prototype, "content", void 0);
    TermConditionsPage = __decorate([
        Component({
            selector: 'app-term-conditions',
            templateUrl: './term-conditions.page.html',
            styleUrls: ['./term-conditions.page.scss'],
        }),
        __metadata("design:paramtypes", [NavController, DataService, MenuController])
    ], TermConditionsPage);
    return TermConditionsPage;
}());
export { TermConditionsPage };
//# sourceMappingURL=term-conditions.page.js.map