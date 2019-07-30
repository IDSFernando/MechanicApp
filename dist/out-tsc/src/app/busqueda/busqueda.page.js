import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, Events, PickerController, AlertController } from '@ionic/angular';
var BusquedaPage = /** @class */ (function () {
    function BusquedaPage(param, modalFiltros, events, picker, alert) {
        var _this = this;
        this.param = param;
        this.modalFiltros = modalFiltros;
        this.events = events;
        this.picker = picker;
        this.alert = alert;
        this.busqueda = '';
        this.filtro_categoria = 'Todos';
        this.filtro_valoracion = 'Todos';
        this.filtro_ubicacion = 'Todos';
        this.showingFiltersBar = false;
        this.param.queryParams.subscribe(function (params) {
            var busco = params['busco'];
            _this.busqueda = busco;
        });
    }
    BusquedaPage.prototype.ngOnInit = function () {
        //Pedir a la API los resultados de búsqueda
        this.showingFiltersBar = false;
        return Promise.resolve(this.showFiltersBar);
    };
    BusquedaPage.prototype.showFiltersBar = function () {
        if (!this.showingFiltersBar)
            this.showingFiltersBar = true;
        else
            this.showingFiltersBar = false;
    };
    /**
    * Abrir el Popup con las opciones de filtros para
    * las categorías
    */
    BusquedaPage.prototype.openCatPopup = function () {
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
    BusquedaPage.prototype.openRatePopup = function () {
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
    BusquedaPage.prototype.openLocPopup = function () {
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
    BusquedaPage.prototype.showAlert = function (text) {
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
    BusquedaPage = tslib_1.__decorate([
        Component({
            selector: 'app-busqueda',
            templateUrl: './busqueda.page.html',
            styleUrls: ['./busqueda.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
            ModalController,
            Events,
            PickerController,
            AlertController])
    ], BusquedaPage);
    return BusquedaPage;
}());
export { BusquedaPage };
//# sourceMappingURL=busqueda.page.js.map