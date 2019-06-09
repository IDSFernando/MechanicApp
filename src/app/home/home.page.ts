import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServiceDetailsPage } from '../service-details/service-details.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private openPageAsModal : ModalController,
  )
  {

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
}
