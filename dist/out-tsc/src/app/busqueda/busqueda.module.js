import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BusquedaPage } from './busqueda.page';
var routes = [
    {
        path: '',
        component: BusquedaPage
    }
];
var BusquedaPageModule = /** @class */ (function () {
    function BusquedaPageModule() {
    }
    BusquedaPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [BusquedaPage]
        })
    ], BusquedaPageModule);
    return BusquedaPageModule;
}());
export { BusquedaPageModule };
//# sourceMappingURL=busqueda.module.js.map