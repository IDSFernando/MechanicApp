import { Component, OnInit } from '@angular/core';
import { NavParams, AlertController, ModalController, MenuController, NavController } from '@ionic/angular'
import { Router } from '@angular/router'
import { RESTService } from '../rest.service';
interface userData {
  email: string,
  lastname: string,
  id: number,
  name: string,
  username: string,
  userImage: string
}

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  currentModal: ModalController
  userdata: userData
  constructor(
    private nav: NavParams,
    private router: Router,
    private menu: MenuController,
    private navCtrl: NavController,
    private api: RESTService,
    private alert: AlertController,
  )
  {
    this.currentModal = this.nav.get('modal')
    this.userdata = this.nav.get('userdata')
  }

  ngOnInit() {
  }

  leave()
  {
    this.currentModal.dismiss()
  }

  cerrarSesion()
  {
    localStorage.removeItem('auth_token')
    this.menu.close()
    this.menu.enable(false)
    this.navCtrl.navigateRoot([''])
    this.leave()
  }

  async deleteAccount()
  {
    const alert = await this.alert.create({
      header: '¿Estás seguro?',
      translucent: true,
      message: 'Esta acción no se podrá revertir',
      buttons: [
        {
          text: 'No, no quiero 😣',
          role: 'cancel',
          handler: (blah) => {
          }
        }, {
          text: 'Borrar mi cuenta 🥺',
          handler: () => {
            this.api.deleteMyAccount(localStorage.getItem('auth_token'))
            .subscribe(
              (response) => {
                this.currentModal.dismiss()
                localStorage.removeItem('auth_token')
                this.navCtrl.navigateRoot([''])
              },
              (error) => {
                this.showAlert(this.objToString(error))
              }
            )
          }
        }
      ]
    });

    await alert.present();
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

}
