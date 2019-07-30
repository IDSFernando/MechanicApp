import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavParams, MenuController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
var AccountPage = /** @class */ (function () {
    function AccountPage(nav, router, menu, navCtrl) {
        this.nav = nav;
        this.router = router;
        this.menu = menu;
        this.navCtrl = navCtrl;
        this.currentModal = this.nav.get('modal');
        this.userdata = this.nav.get('userdata');
    }
    AccountPage.prototype.ngOnInit = function () {
    };
    AccountPage.prototype.leave = function () {
        this.currentModal.dismiss();
    };
    AccountPage.prototype.cerrarSesion = function () {
        localStorage.removeItem('auth_token');
        this.menu.close();
        this.menu.enable(false);
        this.navCtrl.navigateRoot(['']);
        this.leave();
    };
    AccountPage.prototype.deleteAccount = function () {
    };
    AccountPage = tslib_1.__decorate([
        Component({
            selector: 'app-account',
            templateUrl: './account.page.html',
            styleUrls: ['./account.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavParams,
            Router,
            MenuController,
            NavController])
    ], AccountPage);
    return AccountPage;
}());
export { AccountPage };
//# sourceMappingURL=account.page.js.map