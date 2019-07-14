import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServiceDetailsPage } from '../service-details/service-details.page';
import { MenuController } from '@ionic/angular'
import { CallNumber } from '@ionic-native/call-number/ngx'
import { LoadingController } from '@ionic/angular'
import { Router, NavigationExtras } from '@angular/router'


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  palabraBuscada:any
  constructor(
    private openPageAsModal : ModalController,
    private menu: MenuController,
    private llamada: CallNumber,
    private loading: LoadingController,
    private router: Router,
  )
  {
    this.menu.enable(true)
  }


  ionViewDidEnter()
  {
    this.load()
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

    setTimeout(() => {
      loading.dismiss()
    }, 1000);
  }


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
}
