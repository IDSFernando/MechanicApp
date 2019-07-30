import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavParams, PickerController, AlertController } from '@ionic/angular';
var FiltrosPage = /** @class */ (function () {
    function FiltrosPage(nav, picker, alert) {
        this.nav = nav;
        this.picker = picker;
        this.alert = alert;
        this.filtro_categoria = 'Todos';
        this.filtro_valoracion = 'Todos';
        this.filtro_ubicacion = 'Todos';
        this.modal = this.nav.get('modal');
    }
    FiltrosPage.prototype.ngOnInit = function () {
    };
    /**
     * Salir del componente sin guardar los cambios
     */
    FiltrosPage.prototype.leave = function () {
        this.modal.dismiss();
    };
    /**
     * Aplicar los filtros de búsqueda
     *
     * @return  {Event}  Event que obliga al anterior componente
     *                   a actualizar sesgún los cambios.
     */
    FiltrosPage.prototype.save = function () {
        this.modal.dismiss();
    };
    /**
     * Abrir el Popup con las opciones de filtros para
     * las categorías
     */
    FiltrosPage.prototype.openCatPopup = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var options, picker;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = {
                            backdropDismiss: false,
                            buttons: [
                                {
                                    text: 'Cancelar',
                                    role: 'cancel',
                                    handler: function (value) { }
                                },
                                {
                                    text: 'OK',
                                    handler: function (selected) {
                                        _this.filtro_categoria = selected.categorias.value;
                                    }
                                }
                            ],
                            columns: [
                                {
                                    name: 'categorias',
                                    options: [
                                        {
                                            text: 'Todos',
                                            value: 'Todos'
                                        },
                                        {
                                            text: 'Talleres',
                                            value: 'Talleres'
                                        },
                                        {
                                            text: 'Servicios',
                                            value: 'Servicios'
                                        },
                                    ]
                                }
                            ]
                        };
                        return [4 /*yield*/, this.picker.create(options)];
                    case 1:
                        picker = _a.sent();
                        picker.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Abrir el Popup con las opciones de filtros para
     * las valoraciones
     */
    FiltrosPage.prototype.openRatePopup = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var options, picker;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = {
                            backdropDismiss: false,
                            buttons: [
                                {
                                    text: 'Cancelar',
                                    role: 'cancel',
                                    handler: function (value) { }
                                },
                                {
                                    text: 'OK',
                                    handler: function (selected) {
                                        _this.filtro_valoracion = selected.valoracion.value;
                                    }
                                }
                            ],
                            columns: [
                                {
                                    name: 'valoracion',
                                    options: [
                                        {
                                            text: 'Todos',
                                            value: 'Todos'
                                        },
                                        {
                                            text: 'Los mejores',
                                            value: 'Los mejores'
                                        },
                                        {
                                            text: 'Los poco conocidos',
                                            value: 'Los poco conocidos'
                                        },
                                    ]
                                }
                            ]
                        };
                        return [4 /*yield*/, this.picker.create(options)];
                    case 1:
                        picker = _a.sent();
                        picker.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Abrir el Popup con las opciones de filtros para
     * las opciones de ubicación
     */
    FiltrosPage.prototype.openLocPopup = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var options, picker;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = {
                            backdropDismiss: false,
                            buttons: [
                                {
                                    text: 'Cancelar',
                                    role: 'cancel',
                                    handler: function (value) { }
                                },
                                {
                                    text: 'OK',
                                    handler: function (selected) {
                                        _this.filtro_ubicacion = selected.ubicacion.value;
                                    }
                                }
                            ],
                            columns: [
                                {
                                    name: 'ubicacion',
                                    options: [
                                        {
                                            text: 'Todos',
                                            value: 'Todos'
                                        },
                                        {
                                            text: 'Cerca de mí',
                                            value: 'Cerca de mí'
                                        },
                                        {
                                            text: 'Lejos de mí',
                                            value: 'Lejos de mí'
                                        },
                                    ]
                                }
                            ]
                        };
                        return [4 /*yield*/, this.picker.create(options)];
                    case 1:
                        picker = _a.sent();
                        picker.present();
                        return [2 /*return*/];
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
    FiltrosPage.prototype.showAlert = function (text) {
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
    FiltrosPage = tslib_1.__decorate([
        Component({
            selector: 'app-filtros',
            templateUrl: './filtros.page.html',
            styleUrls: ['./filtros.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavParams,
            PickerController,
            AlertController])
    ], FiltrosPage);
    return FiltrosPage;
}());
export { FiltrosPage };
//# sourceMappingURL=filtros.page.js.map