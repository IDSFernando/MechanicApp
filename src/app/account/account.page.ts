import { Component, OnInit } from '@angular/core';
import { NavParams, AlertController, ModalController } from '@ionic/angular'

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
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
