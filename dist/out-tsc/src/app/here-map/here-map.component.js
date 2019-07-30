import * as tslib_1 from "tslib";
import { Component, ViewChild, ElementRef, Input } from '@angular/core';
var HereMapComponent = /** @class */ (function () {
    function HereMapComponent() {
    }
    HereMapComponent.prototype.ngOnInit = function () {
        this.platform = new H.service.Platform({
            "app_id": this.appId,
            "app_code": this.appCode
        });
        this.router = this.platform.getRoutingService();
    };
    HereMapComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            var defaultLayers = _this.platform.createDefaultLayers();
            _this.map = new H.Map(_this.mapElement.nativeElement, defaultLayers.normal.map, {
                zoom: 30,
                center: { lat: _this.lat, lng: _this.lng }
            });
            var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(_this.map));
            _this.showMarker();
        }, 100);
    };
    HereMapComponent.prototype.showMarker = function () {
        var Marker = new H.map.Marker({
            lat: this.lat,
            lng: this.lng
        });
        this.map.addObject(Marker);
    };
    tslib_1.__decorate([
        ViewChild("map"),
        tslib_1.__metadata("design:type", ElementRef)
    ], HereMapComponent.prototype, "mapElement", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], HereMapComponent.prototype, "appId", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], HereMapComponent.prototype, "appCode", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], HereMapComponent.prototype, "lat", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], HereMapComponent.prototype, "lng", void 0);
    HereMapComponent = tslib_1.__decorate([
        Component({
            selector: 'app-here-map',
            templateUrl: './here-map.component.html',
            styleUrls: ['./here-map.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], HereMapComponent);
    return HereMapComponent;
}());
export { HereMapComponent };
//# sourceMappingURL=here-map.component.js.map