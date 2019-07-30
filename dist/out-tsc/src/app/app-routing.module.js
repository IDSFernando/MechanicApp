import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
var routes = [
    {
        path: '',
        loadChildren: './login/login.module#LoginPageModule'
    },
    {
        path: 'home',
        loadChildren: './home/home.module#HomePageModule'
    },
    {
        path: 'list',
        loadChildren: './list/list.module#ListPageModule'
    },
    {
        path: 'register',
        loadChildren: './register/register.module#RegisterPageModule'
    },
    { path: 'service-details', loadChildren: './service-details/service-details.module#ServiceDetailsPageModule' },
    { path: 'account', loadChildren: './account/account.module#AccountPageModule' },
    { path: 'busqueda', loadChildren: './busqueda/busqueda.module#BusquedaPageModule' },
    { path: 'servicio', loadChildren: './servicio/servicio.module#ServicioPageModule' },
    { path: 'filtros', loadChildren: './filtros/filtros.module#FiltrosPageModule' },
];
/*
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' }
];
*/
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map