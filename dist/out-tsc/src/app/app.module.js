import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// la pantalla de login / register
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
// Formularios
import { FormsModule } from '@angular/forms';
import { ServiceDetailsPageModule } from './service-details/service-details.module';
import { AccountPageModule } from './account/account.module';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { BusquedaPageModule } from './busqueda/busqueda.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FiltrosPageModule } from './filtros/filtros.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [AppComponent],
            entryComponents: [],
            imports: [
                BrowserModule,
                IonicModule.forRoot({
                    mode: 'ios'
                }),
                AppRoutingModule,
                FormsModule,
                ServiceDetailsPageModule,
                AccountPageModule,
                BusquedaPageModule,
                HttpClientModule,
                HttpModule,
                FiltrosPageModule,
            ],
            providers: [
                StatusBar,
                SplashScreen,
                { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
                ScreenOrientation,
                CallNumber,
                Geolocation,
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map