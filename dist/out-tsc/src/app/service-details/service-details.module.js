import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ServiceDetailsPage } from './service-details.page';
import { HereMapComponent } from '../here-map/here-map.component';
import { IonicRatingModule } from 'ionic4-rating';
var routes = [
    {
        path: '',
        component: ServiceDetailsPage
    }
];
var ServiceDetailsPageModule = /** @class */ (function () {
    function ServiceDetailsPageModule() {
    }
    ServiceDetailsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                IonicRatingModule,
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                ReactiveFormsModule
            ],
            declarations: [ServiceDetailsPage, HereMapComponent],
            exports: [HereMapComponent]
        })
    ], ServiceDetailsPageModule);
    return ServiceDetailsPageModule;
}());
export { ServiceDetailsPageModule };
//# sourceMappingURL=service-details.module.js.map