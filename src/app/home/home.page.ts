import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ServiceDetailsPage } from '../service-details/service-details.page';
import { MenuController } from '@ionic/angular'
import { CallNumber } from '@ionic-native/call-number/ngx'
import { LoadingController } from '@ionic/angular'
import { Router, NavigationExtras } from '@angular/router'
import { RESTService } from '../rest.service'
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  palabraBuscada: any
  constructor(
    private openPageAsModal : ModalController,
    private menu: MenuController,
    private llamada: CallNumber,
    private loading: LoadingController,
    private router: Router,
    private api:RESTService,
    private alert: AlertController,
  )
  {
    this.menu.enable(true)
  }


  ionViewDidEnter()
  {
    this.menu.enable(true)
    const auth_token = localStorage.getItem('auth_token')
    if(!auth_token)
    {
      this.router.navigateByUrl('')
    }
    else
    {
      this.load()
    }
  }

  /**
   * Abrir la vista donde se ven los detalles de un servicio
   *
   * @param   {number}  id  ID del servicio
   *
   * @return  {Modal}      Modal con una vista previa del servicio
   */
  async openServiceDetails(id)
  {
    let modal = await this.openPageAsModal.create({
      component: ServiceDetailsPage,
      componentProps: {
        modal: this.openPageAsModal,
        id: id
      }
    })

    return await modal.present()
  }

  // Llamar al 911
  call911()
  {
    this.llamada.callNumber('911', true)
    .then(
      res => console.log(res)
    )
    .catch(
      err => console.error(err)
    )
  }

  //Llamar a un contato de emergencia
  callEmergencyContact()
  {
    const numero = '9611812935'
    this.llamada.callNumber(numero, true)
    .then(
      res => console.log(res)
    )
    .catch(
      err => console.error(err)
    )
  }

  //Obtener los datos desde la API
  async load()
  {
    const loading = await this.loading.create({
      message: 'Espere...',
      translucent: true,
      backdropDismiss: false,
      showBackdrop: true
    });

    await loading.present()

    // Cambiar por obtener los cma's cercanos
    this.api.getUserData({
      token: localStorage.getItem('auth_token')
    }).subscribe(
      response => {
        loading.dismiss()
        // this.userdata.email = response['user'].email
        // this.userdata.id = parseInt( response['user'].id )
        // this.userdata.lastname = response['user'].lastname
        // this.userdata.name = response['user'].name
        // this.userdata.userImage = response['user'].user_image_url
        // this.userdata.username = response['user'].username
      },
      error => {
        loading.dismiss()
        this.showAlert('No pudimos obtener tus credenciales de acceso')
        this.router.navigateByUrl('')
      }
    )
  }

  /**
   * Buscar un servicio, taller
   *
   * @param   {Event}  e
   *
   * @return  {redirect}     Vista de búsqueda
   */
  async buscar(e)
  {
    this.palabraBuscada = e.target.value
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "busco": this.palabraBuscada
      }
    }
    this.palabraBuscada = null
    await this.router.navigate(["busqueda"], navigationExtras)
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
