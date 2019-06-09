import { Component, OnInit } from '@angular/core';

import { NavParams, AlertController, ModalController } from '@ionic/angular'

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.page.html',
  styleUrls: ['./service-details.page.scss'],
})
export class ServiceDetailsPage implements OnInit {

  currentModal: ModalController
  constructor(
    private nav: NavParams,
  )
  {
    this.currentModal = this.nav.get('modal')
  }

  ngOnInit() {
  }

  leave()
  {
    this.currentModal.dismiss()
  }

}
