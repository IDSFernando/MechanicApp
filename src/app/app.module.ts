import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// la pantalla de login / register
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx'
// Formularios
import { FormsModule } from '@angular/forms'
import { ServiceDetailsPageModule } from './service-details/service-details.module';
import { AccountPageModule } from './account/account.module';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { HereMapComponent } from './here-map/here-map.component';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ServiceDetailsPageModule,
    AccountPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ScreenOrientation,
    CallNumber
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
