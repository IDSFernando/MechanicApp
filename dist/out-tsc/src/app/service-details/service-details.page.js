import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavParams, AlertController } from '@ionic/angular';
// Importación necesaria para poder realizar llamadas telefónicas
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ActionSheetController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import { LoadingController } from '@ionic/angular';
import { resolve } from 'q';
import { Geolocation } from '@ionic-native/geolocation/ngx';
var ServiceDetailsPage = /** @class */ (function () {
    function ServiceDetailsPage(nav, llamada, actionSheetController, formBuilder, loading, alert, gps) {
        this.nav = nav;
        this.llamada = llamada;
        this.actionSheetController = actionSheetController;
        this.formBuilder = formBuilder;
        this.loading = loading;
        this.alert = alert;
        this.gps = gps;
        this.currentSegment = "map";
        this.phoneNumbers = [];
        this.comentarios = [];
        this.currentCMA = null;
        this.roundedRate = 0;
        this.userLat = '';
        this.userLng = '';
        mapboxgl.accessToken = 'pk.eyJ1IjoiaWRzZmVybmFuZG8iLCJhIjoiY2p4NHhzZjQ3MDJyNzQzdXJxYW01cGE4NSJ9.703KpAMi7SCviDt79F_Y1g';
        this.currentModal = this.nav.get('modal');
        this.phoneNumbers = [
            '9611319085',
            '9612387823'
        ];
        this.commentFormGroup = this.formBuilder.group({
            'rate': ['', Validators.required],
            'comment': ['', Validators.required]
        });
    }
    ServiceDetailsPage.prototype.showMap = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var map, geojson;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //Obtener la ubicación del cliente
                    return [4 /*yield*/, this.gps.getCurrentPosition().then(function (pos) {
                            _this.userLng = pos.coords.longitude;
                            _this.userLat = pos.coords.latitude;
                        }, function (error) {
                            _this.showAlert('No pudimos acceder a tu ubicación, verifica lo siguiente:\n1. ¿Está encendido el GPS de tu dispositivo?\n2. ¿Nos otorgaste acceso a usar tu GPS?');
                        })];
                    case 1:
                        //Obtener la ubicación del cliente
                        _a.sent();
                        map = new mapboxgl.Map({
                            container: 'taller-map',
                            style: 'mapbox://styles/mapbox/streets-v11',
                            zoom: 15,
                            center: [
                                parseFloat(this.currentCMA.longitude),
                                parseFloat(this.currentCMA.latitude)
                            ]
                        });
                        geojson = {
                            type: 'FeatureCollection',
                            features: [{
                                    type: 'Feature',
                                    geometry: {
                                        type: 'Point',
                                        coordinates: [this.currentCMA.longitude, this.currentCMA.latitude]
                                    },
                                    properties: {
                                        title: this.currentCMA.name,
                                        description: this.currentCMA.address
                                    }
                                },
                                {
                                    type: 'Feature',
                                    geometry: {
                                        type: 'Point',
                                        coordinates: [this.userLng, this.userLat]
                                    },
                                    properties: {
                                        title: 'Aquí estás tú',
                                        description: ''
                                    }
                                }]
                        };
                        //Agregar geoJSON al mapa
                        geojson.features.forEach(function (marker) {
                            // create a HTML element for each feature
                            var el = document.createElement('div');
                            el.className = 'marker';
                            // make a marker for each feature and add to the map
                            new mapboxgl.Marker(el)
                                .setLngLat(marker.geometry.coordinates)
                                .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                                .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
                                .addTo(map);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ServiceDetailsPage.prototype.ionViewDidLoad = function () {
    };
    ServiceDetailsPage.prototype.ionViewDidEnter = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var er_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.load()];
                    case 1:
                        _a.sent();
                        this.showMap();
                        return [3 /*break*/, 3];
                    case 2:
                        er_1 = _a.sent();
                        this.showAlert(er_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, Promise.resolve(this.currentCMA)];
                }
            });
        });
    };
    //Obtener los datos desde la API
    ServiceDetailsPage.prototype.load = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading, _a, e_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.loading.create({
                            message: 'Cargando datos del taller...',
                            translucent: true,
                            backdropDismiss: false,
                            showBackdrop: true
                        })];
                    case 1:
                        loading = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        _a = this;
                        return [4 /*yield*/, this.nav.get('cma')];
                    case 3:
                        _a.currentCMA = _b.sent();
                        this.roundedRate = Math.round(this.currentCMA.grade_average);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _b.sent();
                        this.showAlert('Ocurrió un error mientras se obtenían los datos');
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ServiceDetailsPage.prototype.ngOnInit = function () {
    };
    /**
    * Llamar al CMA
    *
    * @param   {number}  number  Número telefónico del CMA
    *
    */
    ServiceDetailsPage.prototype.call = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _buttons_1, actionSheet;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.phoneNumbers.length > 1)) return [3 /*break*/, 3];
                        _buttons_1 = [];
                        this.phoneNumbers.forEach(function (number) {
                            _buttons_1.push({
                                text: number,
                                handler: function () {
                                    _this.tryCall(number);
                                }
                            });
                        });
                        _buttons_1.push({
                            text: 'Cancelar',
                            role: 'cancel',
                            handler: function () {
                                console.log('Cancel clicked');
                            }
                        });
                        return [4 /*yield*/, this.actionSheetController.create({
                                header: 'Elige una opción',
                                translucent: true,
                                buttons: _buttons_1
                            })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this.tryCall(this.phoneNumbers[0]);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ServiceDetailsPage.prototype.tryCall = function (number) {
        var numero = '' + number;
        this.llamada.callNumber(numero, true)
            .then(function (res) {
            // En este punto la GUI de la llamada se encuentra en curso
        })
            .catch(function (err) {
            alert("La llamada no se pudo realizar,\n " + err);
        });
    };
    /**
    * Salir de la vista actual
    *
    */
    ServiceDetailsPage.prototype.leave = function () {
        this.currentModal.dismiss();
    };
    ServiceDetailsPage.prototype.eval = function () {
        var _this = this;
        this.comentarios.unshift({
            autor: 'Luis Fernando',
            mensaje: this.commentFormGroup.get('comment').value,
            valoracion: this.commentFormGroup.get('rate').value
        });
        return resolve(this.comentarios).then(function () {
            _this.commentFormGroup.reset();
        });
    };
    /**
 * Mostrar una alerta, ya sea de error o de success
 *
 * @param   {String}  text  Texto a mostrar
 *
 * @return  {Alert}     Alerta
 */
    ServiceDetailsPage.prototype.showAlert = function (text) {
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
    ServiceDetailsPage.prototype.objToString = function (obj) {
        var str = '';
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                str += p + '::' + obj[p] + '\n';
            }
        }
        return str;
    };
    ServiceDetailsPage = tslib_1.__decorate([
        Component({
            selector: 'app-service-details',
            templateUrl: './service-details.page.html',
            styleUrls: ['./service-details.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavParams,
            CallNumber,
            ActionSheetController,
            FormBuilder,
            LoadingController,
            AlertController,
            Geolocation])
    ], ServiceDetailsPage);
    return ServiceDetailsPage;
}());
export { ServiceDetailsPage };
//# sourceMappingURL=service-details.page.js.map