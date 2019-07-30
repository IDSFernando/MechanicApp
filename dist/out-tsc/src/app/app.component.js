import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Platform, ModalController, NavController, AlertController, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { AccountPage } from './account/account.page';
import { RESTService } from './rest.service';
import { Router } from '@angular/router';
var AppComponent = /** @class */ (function () {
    function AppComponent(platform, splashScreen, statusBar, screen, openPageAsModal, api, router, navCtrl, alert, events) {
        var _this = this;
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.screen = screen;
        this.openPageAsModal = openPageAsModal;
        this.api = api;
        this.router = router;
        this.navCtrl = navCtrl;
        this.alert = alert;
        this.events = events;
        this.userdata = {
            email: '',
            lastname: '',
            id: null,
            name: '',
            username: '',
            userImage: ''
        };
        this.icons = [
            {
                icon: 'water',
                keyword: 'aceite'
            },
            {
                icon: 'archive',
                keyword: 'motor'
            },
            {
                icon: 'car',
                keyword: 'suspensión'
            },
            {
                icon: 'hand',
                keyword: 'frenos'
            },
            {
                icon: 'snow',
                keyword: 'sistema de enfriamiento'
            },
        ];
        this.howManyTimesDidIAskedYourCredentials = 0;
        this.appPages = [
            {
                title: 'Inicio',
                url: '/home',
                icon: 'home',
                color: 'danger'
            }
        ];
        this.initializeApp();
        events.subscribe('user:logged', function (a, b) {
            _this.getUserData();
            _this.getAllServices();
        });
    }
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            _this.screen.lock(_this.screen.ORIENTATIONS.PORTRAIT);
            var tok = localStorage.getItem('auth_token');
            if (tok) {
                _this.events.publish('user:logged', null, null);
                _this.navCtrl.navigateRoot(['home']);
            }
        });
    };
    /**
     * Obtener todos los servicios
     *
     * @return  {[type]}  [return description]
     */
    AppComponent.prototype.getAllServices = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var tok;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, localStorage.getItem('auth_token')];
                    case 1:
                        tok = _a.sent();
                        this.api.getAllServices(tok)
                            .subscribe(function (data) {
                            // active: true
                            // created_at: null
                            // description: "Cambio de aceite de motor."
                            // id: 1
                            // name: "Aceite"
                            // notes: null
                            // updated_at: null
                            data.services.forEach(function (s) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var _icon;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.getIconFromKeyword(s.name)];
                                        case 1:
                                            _icon = _a.sent();
                                            this.appPages.push({
                                                title: s.name,
                                                url: '/home',
                                                icon: _icon,
                                                color: 'dark'
                                            });
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        }, function (error) {
                            _this.showAlert(_this.objToString(error));
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    AppComponent.prototype.getUserData = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var token;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, localStorage.getItem('auth_token')];
                    case 1:
                        token = _a.sent();
                        if (token) {
                            this.api.getUserData({
                                token: localStorage.getItem('auth_token')
                            }).subscribe(function (response) {
                                _this.userdata.email = response['user'].email;
                                _this.userdata.id = parseInt(response['user'].id);
                                _this.userdata.lastname = response['user'].lastname;
                                _this.userdata.name = response['user'].name;
                                _this.userdata.userImage = response['user'].user_image_url;
                                _this.userdata.username = response['user'].username;
                                _this.navCtrl.navigateRoot(['home']);
                            }, function (error) {
                                _this.navCtrl.navigateRoot(['']);
                                _this.router.navigateByUrl('');
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AppComponent.prototype.openAccountDetails = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.openPageAsModal.create({
                            component: AccountPage,
                            componentProps: {
                                modal: this.openPageAsModal,
                                userdata: this.userdata
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Mostrar una alerta, ya sea de error o de success
     *
     * @param   {String}  text  Texto a mostrar
     *
     * @return  {Alert}     Alerta
     */
    AppComponent.prototype.showAlert = function (text) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alert.create({
                            header: "Mechanicapp",
                            message: text,
                            buttons: ['Ok'],
                            translucent: true
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Mostrar las propiedades de un objeto
     * @param  obj Objeto
     * @return String [Estructura del objeto]
     */
    AppComponent.prototype.objToString = function (obj) {
        var str = '';
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                str += p + '::' + obj[p] + '\n';
            }
        }
        return str;
    };
    AppComponent.prototype.getIconFromKeyword = function (keyword) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, busco;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = '';
                        busco = '' + keyword.toLowerCase();
                        return [4 /*yield*/, this.icons.forEach(function (element) {
                                if (element.keyword == busco) {
                                    result = element.icon;
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [Platform,
            SplashScreen,
            StatusBar,
            ScreenOrientation,
            ModalController,
            RESTService,
            Router,
            NavController,
            AlertController,
            Events])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map