import { Component } from '@angular/core';

import { Platform, ModalController, NavController, AlertController, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx'
import { AccountPage } from './account/account.page';
import { RESTService } from './rest.service';
import { Router } from '@angular/router'

interface userData {
  email: string,
  lastname: string,
  id: number,
  name: string,
  username: string,
  userImage: string
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  userdata: userData = {
    email: '',
    lastname: '',
    id: null,
    name: '',
    username: '',
    userImage: ''
  }

  howManyTimesDidIAskedYourCredentials:number = 0

  public appPages = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Alineación y balanceo',
      url: '/list',
      icon: 'repeat'
    },
    {
      title: 'Inyección electrónica y mecánica',
      url: '/list',
      icon: 'car'
    },
    {
      title: 'Aire acondicionado',
      url: '/list',
      icon: 'snow'
    },
    {
      title: 'Frenos',
      url: '/list',
      icon: 'hand'
    },
    {
      title: 'Cajas de velocidad',
      url: '/list',
      icon: 'speedometer'
    },
    {
      title: 'Pintura',
      url: '/list',
      icon: 'brush'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private screen: ScreenOrientation,
    private openPageAsModal : ModalController,
    private api:RESTService,
    private router: Router,
    private navCtrl: NavController,
    private alert: AlertController,
    private events: Events,
  ) {
    this.initializeApp();
    events.subscribe('user:logged', (a,b) => {
      this.getUserData()
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.screen.lock(this.screen.ORIENTATIONS.PORTRAIT)
      this.getUserData()
    });
  }

  async getUserData()
  {
    const token = localStorage.getItem('auth_token')

    if(token)
    {
      this.api.getUserData({
        token: localStorage.getItem('auth_token')
      }).subscribe(
        response => {
          this.userdata.email = response['user'].email
          this.userdata.id = parseInt( response['user'].id )
          this.userdata.lastname = response['user'].lastname
          this.userdata.name = response['user'].name
          this.userdata.userImage = response['user'].user_image_url
          this.userdata.username = response['user'].username
          this.navCtrl.navigateRoot(['home'])
        },
        error => {
          this.navCtrl.navigateRoot([''])
          this.router.navigateByUrl('')
        }
      )
    }
  }

  async openAccountDetails()
  {
    let modal = await this.openPageAsModal.create({
      component: AccountPage,
      componentProps: {
        modal: this.openPageAsModal,
        userdata: this.userdata
      }
    })

    return await modal.present()
  }

  /**
   * Mostrar una alerta, ya sea de error o de success
   *
   * @param   {String}  text  Texto a mostrar
   *
   * @return  {Alert}     Alerta
   */
  async showAlert(text:any)
  {
    let alert = await this.alert.create({
      header: "Mechanicapp",
      message: text,
      buttons: ['Ok'],
      translucent: true
    });
    return await alert.present();
  }
}
