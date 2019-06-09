import { Component } from '@angular/core';

import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx'
import { AccountPage } from './account/account.page';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Talleres',
      url: '/list',
      icon: 'build'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private screen: ScreenOrientation,
    private openPageAsModal : ModalController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.screen.lock(this.screen.ORIENTATIONS.PORTRAIT)
    });
  }

  async openAccountDetails()
  {
    let modal = await this.openPageAsModal.create({
      component: AccountPage,
      componentProps: {
        modal: this.openPageAsModal,
      }
    })

    return await modal.present()
  }
}
