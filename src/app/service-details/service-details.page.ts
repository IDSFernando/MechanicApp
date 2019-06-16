import { Component, OnInit } from '@angular/core';

import { NavParams, AlertController, ModalController } from '@ionic/angular'


// Importación necesaria para poder realizar llamadas telefónicas
import { CallNumber } from '@ionic-native/call-number/ngx';


@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.page.html',
  styleUrls: ['./service-details.page.scss'],
})
export class ServiceDetailsPage implements OnInit {

  currentModal: ModalController

  currentSegment: string = "map";
  constructor(
    private nav: NavParams,
    private llamada: CallNumber,
  )
  {
    this.currentModal = this.nav.get('modal')
  }

  ngOnInit() {
  }

  /**
   * Llamar al CMA
   *
   * @param   {number}  number  Número telefónico del CMA
   * 
   */
  call(number)
  {
    const numero = ''+number
    this.llamada.callNumber(numero, true)
    .then(res => {
      // En este punto la GUI de la llamada se encuentra en curso
    })
    .catch(err => {
      alert(`La llamada no se pudo realizar,\n ${err}`)
    })

  }

  /**
   * Salir de la vista actual
   *
   */
  leave()
  {
    this.currentModal.dismiss()
  }

}
