import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FiltrosPage } from './filtros.page';
var routes = [
    {
        path: '',
        component: FiltrosPage
    }
];
var FiltrosPageModule = /** @class */ (function () {
    function FiltrosPageModule() {
    }
    FiltrosPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [FiltrosPage]
        })
    ], FiltrosPageModule);
    return FiltrosPageModule;
}());
export { FiltrosPageModule };
//# sourceMappingURL=filtros.module.js.map