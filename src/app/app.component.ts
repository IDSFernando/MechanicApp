import { Component } from '@angular/core';

import { Platform, ModalController, NavController, AlertController, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx'
import { AccountPage } from './account/account.page';
import { RESTService } from './rest.service';
import { Router, NavigationExtras } from '@angular/router'

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

  icons:any = [
    {
      icon: 'water',
      keyword: 'aceite'
    },
    {
      icon: 'archive',
      keyword: 'motor'
    },
    {
      icon: 'car',
      keyword: 'suspensión'
    },
    {
      icon: 'hand',
      keyword: 'frenos'
    },
    {
      icon: 'snow',
      keyword: 'sistema de enfriamiento'
    },
  ]

  howManyTimesDidIAskedYourCredentials:number = 0

  public appPages = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'home',
      color: 'warning'
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
      this.getAllServices()
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.screen.lock(this.screen.ORIENTATIONS.PORTRAIT)
      const tok = localStorage.getItem('auth_token')
      if(tok)
      {
        this.events.publish('user:logged', null, null)
        this.navCtrl.navigateRoot(['home'])
      }

      this.platform.backButton.subscribe(async () => {
        if (this.router.isActive('/home', true) && this.router.url === '/home') {
          navigator['app'].exitApp();
        } else if (this.router.isActive('/', true) && this.router.url === '/') {
          navigator['app'].exitApp();
        }
      });
    });
  }

  /**
   * Obtener todos los servicios
   *
   * @return  {[type]}  [return description]
   */
  async getAllServices()
  {

    //Limpiar antes de hacer un push
    this.appPages = [
      {
        title: 'Inicio',
        url: '/home',
        icon: 'home',
        color: 'warning'
      }
    ]
    const tok = await localStorage.getItem('auth_token')
    this.api.getAllServices(tok)
    .subscribe(
      (data) => {
        // active: true
        // created_at: null
        // description: "Cambio de aceite de motor."
        // id: 1
        // name: "Aceite"
        // notes: null
        // updated_at: null
        data.services.forEach(async s => {
          const _icon = await this.getIconFromKeyword(s.name)
          this.appPages.push(
            {
              title: s.name,
              url: '/home',
              icon: _icon,
              color: 'dark'
            }
          )
        })
      },
      (error) => {
        // this.showAlert(this.objToString(error))
      }
    )
  }

  async getUserData()
  {
    const token = await localStorage.getItem('auth_token')

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
          this.showAlert('Parece que no tienes una conexión a internet activa')
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

  /**
   * Mostrar las propiedades de un objeto
   * @param  obj Objeto
   * @return String [Estructura del objeto]
   */
  objToString (obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + '::' + obj[p] + '\n';
        }
    }
    return str;
  }

  async getIconFromKeyword(keyword)
  {
    let result = ''
    const busco = ''+keyword.toLowerCase()
    await this.icons.forEach(element => {
      if(element.keyword == busco)
      {
        result = element.icon
      }
    })
    return result
  }

  /**
   * Reciclar la vista de búsqueda
   *
   * @param   {[String]}  servicio  servicio de búsqueda
   */
  goToThis(servicio)
  {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "busco": ''+servicio
      }
    }
    
    this.router.navigate(["busqueda"], navigationExtras)
  }
}
